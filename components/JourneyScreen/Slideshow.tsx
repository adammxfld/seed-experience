import { useRef, useState, useEffect } from 'react';
import styles from './Slideshow.module.scss';
import { Slide } from './Slide';
import IntroSlot from './IntroSlot/IntroSlot';
import DaysWeeksSlot from './DaysWeeksSlot/DaysWeeksSlot';
import { FILMSTRIP, VISUAL_SLOTS, filmstripToVisualSlot } from './journey.config';

interface SlideshowProps {
  currentIndex: number;
  isExiting?: boolean;
  onAdvance?: () => void;
}

export function Slideshow({ currentIndex, isExiting = false, onAdvance }: SlideshowProps) {
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
                isActive={FILMSTRIP[currentIndex]?.type === 'daysweeks' && !isExiting}
                isPast={currentIndex > slot.filmstripStart && FILMSTRIP[currentIndex]?.type !== 'daysweeks'}
                onAdvance={onAdvance}
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
