import { useRef, useState, useEffect } from 'react';
import styles from './DaysWeeksSlot.module.scss';
import DaysPanel from './DaysPanel';
import WeekPanel from './WeekPanel';

interface DaysWeeksSlotProps {
  position: number; // 0 = left (First 7 Days), 1 = right (Weeks 2-4)
  isActive?: boolean;
  isPast?: boolean; // the slideshow has moved on to a later slide
  onAdvance?: () => void;
}

const SPHERE_MAX_SCALE = 2.135;
const LINE_FIGURE_SHIFT_X = -5; // % of its own width
const LINE_FIGURE_SHIFT_Y = 20; // % of its own width
const LINE_FIGURE_EXIT_SCALE = 1.5;

export default function DaysWeeksSlot({ position, isActive = true, isPast = false, onAdvance }: DaysWeeksSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Content is visible when in viewport AND active (not exiting)
  const isVisible = isInViewport && isActive;

  // Scale from 1 to SPHERE_MAX_SCALE as position goes from 0 to 1
  const sphereScale = 1 + position * (SPHERE_MAX_SCALE - 1);

  // 0 while on the days/weeks slide, 1 once the slideshow has advanced past it
  const lineFigureExit = isPast ? 1 : 0;
  const lineFigureScale = 1 + lineFigureExit * (LINE_FIGURE_EXIT_SCALE - 1);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${isVisible ? styles.isVisible : ''}`}
    >
      <div
        className={styles.track}
        style={{ transform: `translateX(-${position * 50}%)` }}
      >
        <img
          src="/assets/daysweeks-sphere.svg"
          alt="sphere"
          className={styles.sphere}
          style={{ transform: `translateX(-${position * 38}%) translateY(-46.75%) scale(${sphereScale})` }}
        />

        <DaysPanel isVisible={isVisible} onAdvance={onAdvance} />
        <WeekPanel isVisible={isVisible || isPast} onAdvance={onAdvance} />

        <img
          src="/assets/weeks-line-figure.svg"
          alt="line figure"
          className={styles.lineFigure}
          style={{ transform: `translateX(${lineFigureExit * LINE_FIGURE_SHIFT_X}%) translateY(${lineFigureExit * LINE_FIGURE_SHIFT_Y}%) scale(${lineFigureScale})` }}
        />
      </div>
    </div>
  );
}
