import styles from './Header.module.scss';

import { HeaderLinksPrimary } from './HeaderLinksPrimary';
import { HeaderLinksSecondary } from './HeaderLinksSecondary';

export type ColorMode = 'light' | 'dark';

interface HeaderProps {
  mode?: ColorMode;
}

export function Header({ mode = 'light' }: HeaderProps) {
  return (
    <header className={`${styles.root} ${mode === 'dark' ? styles.dark : ''}`}>
      <HeaderLinksPrimary mode={mode} />
      <HeaderLinksSecondary mode={mode} />
    </header>
  );
}
