import styles from './HeaderLinksPrimary.module.scss';

type ColorMode = 'light' | 'dark';

interface HeaderLinksPrimaryProps {
  mode?: ColorMode;
}

export function HeaderLinksPrimary({ mode = 'light' }: HeaderLinksPrimaryProps) {
  return (
    <div className={`${styles.root} ${mode === 'dark' ? styles.dark : ''}`}>
      <div className={styles.logoSection}>
        <p className={styles.logoText}>Seed ●</p>
      </div>

      <ul className={styles.nav}>
        <li className={styles.navLink}>
          <a className={styles.buttonText} href="#">Shop</a>
        </li>
        <li className={styles.navLink}>
          <a className={styles.buttonText} href="#">Science</a>
        </li>
        <li className={styles.navLink}>
          <a className={styles.buttonText} href="#">Learn</a>
        </li>
      </ul>
    </div>
  );
}
