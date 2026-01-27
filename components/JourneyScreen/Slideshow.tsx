import { useRef, useState, useEffect } from 'react';
import styles from './Slideshow.module.scss';
import { Slide } from './Slide';

export type FrameConfig = string | { children: string[] };

export const FRAMES: FrameConfig[] = [
  '/assets/frames-temp/1.png',
  '/assets/frames-temp/2.png',
  '/assets/frames-temp/3.png',
  {
    children: [
      '/assets/frames-temp/4-1.png',
      '/assets/frames-temp/4-2.png',
      '/assets/frames-temp/4-3.png',
    ],
  },
  '/assets/frames-temp/5.png',
  '/assets/frames-temp/6.png',
];

  /** Filmstrip pauses on each slide before autoplay advances */
export const TIMING = {
  autoplayInterval: 4000,
};

/** Flat list of image paths for the filmstrip track. */
function flattenFrames(frames: FrameConfig[]): string[] {
  return frames.flatMap((f) => (typeof f === 'string' ? [f] : f.children));
}

/** Maps each filmstrip index to a (possibly fractional) step index. */
function buildStepMap(frames: FrameConfig[]): number[] {
  const map: number[] = [];
  frames.forEach((frame, stepIndex) => {
    if (typeof frame === 'string') {
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
    idx += typeof frame === 'string' ? 1 : frame.children.length;
  }
  return idx;
}

export const FILMSTRIP = flattenFrames(FRAMES);
export const STEP_MAP = buildStepMap(FRAMES);

/** Filmstrip indices that trigger dark mode. */
export const DARK_SLIDES = [3, 4, 5, 6, 7];

export function isDarkSlide(index: number): boolean {
  return DARK_SLIDES.includes(index);
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
        {FILMSTRIP.map((src, index) => (
          <div
            key={index}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            data-slide-index={index}
            className={styles.slideSlot}
          >
            <Slide
              src={src}
              alt={`Slide ${index + 1}`}
              isVisible={visibleSlides.has(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
