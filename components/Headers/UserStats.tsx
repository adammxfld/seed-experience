import styles from './UserStats.module.scss';
import { Icon } from '../Icons/Icon';

export function UserStats() {
  return (
    <ul className={styles.root}>
      <li className={styles.statCard}>
        <div className={styles.statHeader}>
          <div className={styles.iconContainer}>
            <div className={styles.iconInner}>
              <Icon name="points" />
            </div>
          </div>
          <p className={styles.statValue}>987</p>
        </div>
        <p className={styles.statLabel}>Points to Spend</p>
      </li>

      <li className={styles.statCard}>
        <div className={styles.statHeader}>
          <div className={styles.iconContainer}>
            <div className={styles.iconInner}>
              <Icon name="subscriptions" />
            </div>
          </div>
          <p className={styles.statValue}>001</p>
        </div>
        <p className={styles.statLabel}>Subscriptions</p>
      </li>

      <li className={styles.statCard}>
        <div className={styles.statHeader}>
          <div className={styles.iconContainer}>
            <div className={`${styles.iconInner} ${styles.iconInnerRotated}`}>
              <Icon name="strainsDelivered" />
            </div>
          </div>
          <p className={styles.statValue}>024</p>
        </div>
        <p className={styles.statLabel}>Strains Delivered</p>
      </li>

      <li className={styles.statCard}>
        <div className={styles.statHeader}>
          <div className={styles.iconContainer}>
            <div className={styles.iconInner}>
              <Icon name="nutrientsDelivered" />
            </div>
          </div>
          <p className={styles.statValue}>020</p>
        </div>
        <p className={styles.statLabel}>Nutrients Delivered</p>
      </li>
    </ul>
  );
}