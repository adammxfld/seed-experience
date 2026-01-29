import { useRef, useState, useEffect } from 'react';
import styles from './Slideshow.module.scss';
import { Slide } from './Slide';
import IntroSlot, { INTRO_SLOT_MODE, INTRO_SLOT_DELAY, INTRO_SLOT_EXIT_DURATION } from './IntroSlot/IntroSlot';
import DaysWeeksSlot, { DAYS_WEEKS_MODE } from './DaysWeeksSlot/DaysWeeksSlot';

export type ColorMode = 'light' | 'dark';

type FrameConfig =
  | { type: 'intro'; mode?: ColorMode; delay?: number; exitDuration?: number }
  | { type: 'image'; src: string; mode?: ColorMode; delay?: number; exitDuration?: number }
  | { type: 'sequence'; children: string[]; mode?: ColorMode; delay?: number; exitDuration?: number }
  | { type: 'daysweeks'; mode?: ColorMode; delay?: number; exitDuration?: number };

type FilmstripItem =
  | { type: 'intro'; mode?: ColorMode; delay?: number; exitDuration?: number }
  | { type: 'image'; src: string; mode?: ColorMode; delay?: number; exitDuration?: number }
  | { type: 'daysweeks'; position: number; mode?: ColorMode; delay?: number; exitDuration?: number };

export const FRAMES: FrameConfig[] = [
  { type: 'intro', mode: INTRO_SLOT_MODE, delay: INTRO_SLOT_DELAY, exitDuration: INTRO_SLOT_EXIT_DURATION },
  { type: 'daysweeks', mode: DAYS_WEEKS_MODE },
  {
    type: 'sequence',
    children: [
      '/assets/frames-temp/4-1.png',
      '/assets/frames-temp/4-2.png',
      '/assets/frames-temp/4-3.png',
    ],
    mode: 'dark',
  },
  { type: 'image', src: '/assets/frames-temp/5.png', mode: 'dark' },
  { type: 'image', src: '/assets/frames-temp/6.png', mode: 'dark' },
];

  /** Filmstrip pauses on each slide before autoplay advances */
export const TIMING = {
  autoplayInterval: 4000,
};

/** Flat list of filmstrip items for the track. */
function flattenFrames(frames: FrameConfig[]): FilmstripItem[] {
  return frames.flatMap<FilmstripItem>((frame) => {
    if (frame.type === 'intro') {
      return [{ type: 'intro', mode: frame.mode, delay: frame.delay, exitDuration: frame.exitDuration }];
    }

    if (frame.type === 'daysweeks') {
      // Expand to 2 filmstrip items (one per panel position)
      return [
        { type: 'daysweeks', position: 0, mode: frame.mode, delay: frame.delay, exitDuration: frame.exitDuration },
        { type: 'daysweeks', position: 1, mode: frame.mode },
      ];
    }

    if (frame.type === 'sequence') {
      return frame.children.map((src, i) => ({
        type: 'image', src, mode: frame.mode,
        // Only the first child of a sequence inherits the delay/exitDuration
        ...(i === 0 && frame.delay != null ? { delay: frame.delay } : {}),
        ...(i === 0 && frame.exitDuration != null ? { exitDuration: frame.exitDuration } : {}),
      }));
    }

    return [{ type: 'image', src: frame.src, mode: frame.mode, delay: frame.delay, exitDuration: frame.exitDuration }];
  });
}

/** Maps each filmstrip index to a (possibly fractional) step index. */
function buildStepMap(frames: FrameConfig[]): number[] {
  const map: number[] = [];
  let stepIndex = 0;
  frames.forEach((frame) => {
    if (frame.type === 'daysweeks') {
      // daysweeks has 2 positions, each is a separate step
      map.push(stepIndex);
      map.push(stepIndex + 1);
      stepIndex += 2;
    } else if (frame.type === 'sequence') {
      frame.children.forEach((_, childIdx) => {
        map.push(stepIndex + childIdx / frame.children.length);
      });
      stepIndex += 1;
    } else {
      map.push(stepIndex);
      stepIndex += 1;
    }
  });
  return map;
}

/** Returns the filmstrip index for the first frame of a given step. */
export function stepToFilmstripIndex(stepIndex: number): number {
  let filmstripIdx = 0;
  let currentStep = 0;
  for (const frame of FRAMES) {
    if (currentStep >= stepIndex) break;
    if (frame.type === 'daysweeks') {
      // daysweeks produces 2 filmstrip items for 2 steps
      const stepsInFrame = 2;
      const stepsToAdvance = Math.min(stepsInFrame, stepIndex - currentStep);
      filmstripIdx += stepsToAdvance;
      currentStep += stepsToAdvance;
    } else if (frame.type === 'sequence') {
      filmstripIdx += frame.children.length;
      currentStep += 1;
    } else {
      filmstripIdx += 1;
      currentStep += 1;
    }
  }
  return filmstripIdx;
}

export const FILMSTRIP = flattenFrames(FRAMES);
export const STEP_MAP = buildStepMap(FRAMES);

export function getSlideMode(index: number): ColorMode {
  return FILMSTRIP[index]?.mode ?? 'light';
}

/** Build visual slots - collapses consecutive daysweeks items into one slot */
type VisualSlot =
  | { type: 'intro' }
  | { type: 'image'; src: string }
  | { type: 'daysweeks'; filmstripStart: number };

function buildVisualSlots(filmstrip: FilmstripItem[]): VisualSlot[] {
  const slots: VisualSlot[] = [];
  let i = 0;
  while (i < filmstrip.length) {
    const item = filmstrip[i];
    if (item.type === 'daysweeks') {
      slots.push({ type: 'daysweeks', filmstripStart: i });
      // Skip all consecutive daysweeks items
      while (i < filmstrip.length && filmstrip[i].type === 'daysweeks') i++;
    } else if (item.type === 'intro') {
      slots.push({ type: 'intro' });
      i++;
    } else {
      slots.push({ type: 'image', src: item.src });
      i++;
    }
  }
  return slots;
}

const VISUAL_SLOTS = buildVisualSlots(FILMSTRIP);

/** Maps filmstrip index to visual slot index */
function filmstripToVisualSlot(filmstripIndex: number): number {
  let slotIndex = 0;
  let filmIdx = 0;
  while (filmIdx < filmstripIndex && slotIndex < VISUAL_SLOTS.length) {
    const slot = VISUAL_SLOTS[slotIndex];
    if (slot.type === 'daysweeks') {
      // Count how many filmstrip items this daysweeks slot spans
      const start = slot.filmstripStart;
      let end = start;
      while (end < FILMSTRIP.length && FILMSTRIP[end].type === 'daysweeks') end++;
      if (filmstripIndex < end) {
        return slotIndex; // Still within this daysweeks slot
      }
      filmIdx = end;
    } else {
      filmIdx++;
    }
    slotIndex++;
  }
  return slotIndex;
}

// Component
interface SlideshowProps {
  currentIndex: number;
  isExiting?: boolean;
}

export function Slideshow({ currentIndex, isExiting = false }: SlideshowProps) {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleSlides, setVisibleSlides] = useState<Set<number>>(
    () => new Set([0]),
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSlides((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            const index = Number(
              (entry.target as HTMLElement).dataset.slideIndex,
            );
            if (entry.isIntersecting) {
              next.add(index);
            } else {
              next.delete(index);
            }
          });
          return next;
        });
      },
      {
        root: null,
        rootMargin: '0px 200% 0px 200%',
        threshold: 0,
      },
    );

    slideRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Compute visual slot index for track translation
  const visualSlotIndex = filmstripToVisualSlot(currentIndex);

  // For daysweeks, compute the internal position
  const getDaysWeeksPosition = (filmstripStart: number): number => {
    if (currentIndex < filmstripStart) return 0;
    const item = FILMSTRIP[currentIndex];
    if (item?.type === 'daysweeks') {
      return item.position;
    }
    // If past daysweeks, show last position
    return 1;
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.track}
        style={{ transform: `translateX(-${visualSlotIndex * 100}%)` }}
      >
        {VISUAL_SLOTS.map((slot, index) => (
          <div
            key={index}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            data-slide-index={index}
            className={styles.slideSlot}
          >
            {slot.type === 'intro' ? (
              <IntroSlot isVisible={visibleSlides.has(index)} isActive={currentIndex === 0 && !isExiting} />
            ) : slot.type === 'daysweeks' ? (
              <DaysWeeksSlot
                position={getDaysWeeksPosition(slot.filmstripStart)}
              />
            ) : (
              <Slide
                src={slot.src}
                alt={`Slide ${index + 1}`}
                isVisible={visibleSlides.has(index)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
