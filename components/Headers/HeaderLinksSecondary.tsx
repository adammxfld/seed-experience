import styles from './HeaderLinksSecondary.module.scss';

export function HeaderLinksSecondary() {
  return (
    <ul className={styles.root}>
      <li className={styles.button}>
        <a className={styles.buttonText} href="#">Account</a>
      </li>
      <li className={styles.button}>
        <a className={styles.buttonText} href="#">Refer</a>
      </li>
    </ul>
  );
}
