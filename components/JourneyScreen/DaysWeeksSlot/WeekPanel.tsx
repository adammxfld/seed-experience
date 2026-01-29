import { Icon } from '@/components/Icons';
import styles from './WeekPanel.module.scss';

interface WeekPanelProps {
  isVisible?: boolean;
  onAdvance?: () => void;
}

export default function WeekPanel({ isVisible = false, onAdvance }: WeekPanelProps) {
  return (
    <div className={`${styles.panel} ${isVisible ? styles.isVisible : ''}`}>
      <div className={styles.panelContent}>
        <div className={styles.headingColumn}>
          <h3>During Weeks <span>2 &amp; 4</span></h3>
        </div>
        <div className={styles.heroColumn}>
          <div className={styles.hero}>
            <img src="/assets/images/weeks-1.png" alt="microbiome illustration" />
            <label>Health Regularity</label>
          </div>
          <div className={styles.hero}>
            <img src="/assets/images/weeks-2.png" alt="Photo of a person" />
            <label>Smoother, Clearer Skin</label>
          </div>
        </div>
        <div className={styles.copyColumn}>
          <h4>You improved your health regularity and skin.</h4>
          <p>Bowel movements became more consistent, and smoother, clearer skin gave you a healthy, resilient glow.</p>
          <button onClick={onAdvance}><Icon name={'arrowRt'} />Dive Deeper</button>
        </div>
      </div>
    </div>
  );
}
