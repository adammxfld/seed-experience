import React from 'react';
import styles from './TreatmentPills.module.scss';

interface PillProps {
  text: string;
  uppercase?: boolean;
}

const Pill: React.FC<PillProps> = ({ text, uppercase = false }) => {
  return (
    <li className={styles.pill}>
      <span className={`${uppercase ? styles.uppercase : ''}`}>
        {text}
      </span>
    </li>
  );
};

const TreatmentPills: React.FC = () => {
  return (
    <ul className={styles.pillsContainer}>
      <Pill text="Day 60" uppercase />
      <Pill text="DS-01®" />
    </ul>
  );
};

export default TreatmentPills;
