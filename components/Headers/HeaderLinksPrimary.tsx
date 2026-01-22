import styles from './HeaderLinksPrimary.module.scss';

export function HeaderLinksPrimary() {
  return (
    <div className={styles.root}>
      <div className={styles.logoSection}>
        <p className={styles.logoText}>Seed ●</p>
      </div>

      <div className={styles.button}>
        <p className={styles.buttonText}>Shop</p>
      </div>
      <div className={styles.button}>
        <p className={styles.buttonText}>Science</p>
      </div>
      <div className={styles.button}>
        <p className={styles.buttonText}>Learn</p>
      </div>
    </div>
  );
}
