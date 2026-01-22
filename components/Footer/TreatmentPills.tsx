import React from 'react';
import styles from './TreatmentPills.module.scss';

interface PillProps {
  text: string;
  uppercase?: boolean;
}

const Pill: React.FC<PillProps> = ({ text, uppercase = false }) => {
  return (
    <div className={styles.pill}>
      <div className={styles.pillBorder} />
      <div className={`${styles.pillText} ${uppercase ? styles.uppercase : ''}`}>
        <p>{text}</p>
      </div>
    </div>
  );
};

const TreatmentPills: React.FC = () => {
  return (
    <div className={styles.pillsContainer}>
      <Pill text="Day 60" uppercase />
      <Pill text="DS-01®" />
    </div>
  );
};

export default TreatmentPills;
