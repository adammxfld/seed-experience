import styles from './HeaderLinksSecondary.module.scss';

type ColorMode = 'light' | 'dark';

interface HeaderLinksSecondaryProps {
  mode?: ColorMode;
}

export function HeaderLinksSecondary({ mode = 'light' }: HeaderLinksSecondaryProps) {
  return (
    <ul className={`${styles.root} ${mode === 'dark' ? styles.dark : ''}`}>
      <li className={styles.button}>
        <a className={styles.buttonText} href="#">Account</a>
      </li>
      <li className={styles.button}>
        <a className={styles.buttonText} href="#">Refer</a>
      </li>
    </ul>
  );
}
