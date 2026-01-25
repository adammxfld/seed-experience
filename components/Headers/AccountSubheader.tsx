import styles from './AccountSubheader.module.scss';

import { UserProfile } from './UserProfile';
import { UserStats } from './UserStats';

export type ColorMode = 'light' | 'dark';

interface AccountSubheaderProps {
  mode?: ColorMode;
}

export function AccountSubheader({ mode = 'light' }: AccountSubheaderProps) {
  return (
    <div className={`${styles.root} ${mode === 'dark' ? styles.dark : ''}`}>
      <UserProfile mode={mode} />
      <UserStats mode={mode} />
    </div>
  );
}
