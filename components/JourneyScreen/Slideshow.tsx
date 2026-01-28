import { useRef, useState, useEffect } from 'react';
import styles from './Slideshow.module.scss';
import { Slide } from './Slide';
import IntroSlot, { INTRO_SLOT_MODE } from './IntroSlot/IntroSlot';

export type ColorMode = 'light' | 'dark';

type FrameConfig =
  | { type: 'intro'; mode?: ColorMode }
  | { type: 'image'; src: string; mode?: ColorMode }
  | { type: 'sequence'; children: string[]; mode?: ColorMode };

type FilmstripItem = { type: 'intro'; mode?: ColorMode } | { type: 'image'; src: string; mode?: ColorMode };

export const FRAMES: FrameConfig[] = [
  { type: 'intro', mode: INTRO_SLOT_MODE },
  { type: 'image', src: '/assets/frames-temp/2.png' },
  { type: 'image', src: '/assets/frames-temp/3.png' },
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
      return [{ type: 'intro', mode: frame.mode }];
    }

    if (frame.type === 'sequence') {
      return frame.children.map((src) => ({ type: 'image', src, mode: frame.mode }));
    }

    return [{ type: 'image', src: frame.src, mode: frame.mode }];
  });
}

/** Maps each filmstrip index to a (possibly fractional) step index. */
function buildStepMap(frames: FrameConfig[]): number[] {
  const map: number[] = [];
  frames.forEach((frame, stepIndex) => {
    if (frame.type !== 'sequence') {
      map.push(stepIndex);
    } else {
      frame.children.forEach((_, childIdx) => {
        map.push(stepIndex + childIdx / frame.children.length);
      });
    }
  });
  return map;
}

/** Returns the filmstrip index for the first frame of a given step. */
export function stepToFilmstripIndex(stepIndex: number): number {
  let idx = 0;
  for (let i = 0; i < stepIndex; i++) {
    const frame = FRAMES[i];
    idx += frame.type === 'sequence' ? frame.children.length : 1;
  }
  return idx;
}

export const FILMSTRIP = flattenFrames(FRAMES);
export const STEP_MAP = buildStepMap(FRAMES);

export function getSlideMode(index: number): ColorMode {
  return FILMSTRIP[index]?.mode ?? 'light';
}

// Component
interface SlideshowProps {
  currentIndex: number;
}

export function Slideshow({ currentIndex }: SlideshowProps) {
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

  return (
    <div className={styles.container}>
      <div
        className={styles.track}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {FILMSTRIP.map((frame, index) => (
          <div
            key={index}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            data-slide-index={index}
            className={styles.slideSlot}
          >
            {frame.type === 'intro' ? (
              <IntroSlot isVisible={visibleSlides.has(index)} />
            ) : (
              <Slide
                src={frame.src}
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
