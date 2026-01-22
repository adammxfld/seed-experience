import styles from './AccountSubheader.module.scss';

import { UserProfile } from './UserProfile';
import { UserStats } from './UserStats';

export function AccountSubheader() {
  return (
    <div className={styles.root}>
      <UserProfile />
      <UserStats />
    </div>
  );
}
