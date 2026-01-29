import styles from './DaysWeeksSlot.module.scss';
import DaysPanel from './DaysPanel';
import WeekPanel from './WeekPanel';

export const DAYS_WEEKS_MODE = 'light' as const;

interface DaysWeeksSlotProps {
  position: number; // 0 = left (First 7 Days), 1 = right (Weeks 2-4)
}

const SPHERE_MAX_SCALE = 2.135;

export default function DaysWeeksSlot({ position }: DaysWeeksSlotProps) {
  // Scale from 1 to SPHERE_MAX_SCALE as position goes from 0 to 1
  const sphereScale = 1 + position * (SPHERE_MAX_SCALE - 1);

  return (
    <div className={styles.container}>
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

        <DaysPanel />
        <WeekPanel />
      </div>
    </div>
  );
}
