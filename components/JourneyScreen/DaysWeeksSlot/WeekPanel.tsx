import { useState } from 'react';
import styles from './WeekPanel.module.scss';
import slotStyles from './DaysWeeksSlot.module.scss';

interface WeekPanelProps {
  isVisible?: boolean;
}

export default function WeekPanel({ isVisible = true }: WeekPanelProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={styles.panel}>
      {isVisible ? (
        <img
          src="/assets/frames-temp/3.png"
          alt="Weeks 2-4"
          className={slotStyles.image}
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
      ) : (
        <div className={styles.placeholder} />
      )}
    </div>
  );
}
