import styles from './HeaderLinksSecondary.module.scss';

export function HeaderLinksSecondary() {
  return (
    <div className={styles.root}>
      <div className={styles.button}>
        <p className={styles.buttonText}>Account</p>
      </div>
      <div className={styles.button}>
        <p className={styles.buttonText}>Refer</p>
      </div>
    </div>
  );
}
