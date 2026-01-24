import styles from './Header.module.scss';

import { HeaderLinksPrimary } from './HeaderLinksPrimary';
import { HeaderLinksSecondary } from './HeaderLinksSecondary';

export function Header() {
  return (
    <header className={styles.root}>
      <HeaderLinksPrimary />
      <HeaderLinksSecondary />
    </header>
  );
}
