import { useRef, useState, useEffect } from 'react';
import styles from './DaysWeeksSlot.module.scss';
import DaysPanel from './DaysPanel';
import WeekPanel from './WeekPanel';

export const DAYS_WEEKS_MODE = 'light' as const;

interface DaysWeeksSlotProps {
  position: number; // 0 = left (First 7 Days), 1 = right (Weeks 2-4)
  isActive?: boolean;
  onAdvance?: () => void;
}

const SPHERE_MAX_SCALE = 2.135;

export default function DaysWeeksSlot({ position, isActive = true, onAdvance }: DaysWeeksSlotProps) {
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
          alt=""
          className={styles.sphere}
          style={{ transform: `translateX(-${position * 38}%) translateY(-46.75%) scale(${sphereScale})` }}
        />

        <DaysPanel isVisible={isVisible} onAdvance={onAdvance} />
        <WeekPanel isVisible={isVisible} onAdvance={onAdvance} />
      </div>
    </div>
  );
}
