import styles from './UserProfile.module.scss';

import { imgHeadshot as maskImg } from './imports/svg-a5sg4';

type ColorMode = 'light' | 'dark';

interface UserProfileProps {
  mode?: ColorMode;
}

export function UserProfile({ mode = 'light' }: UserProfileProps) {
  return (
    <div className={`${styles.root} ${mode === 'dark' ? styles.dark : ''}`}>
      <p className={styles.welcomeText}>
        Welcome bac
        <span className={styles.dot}>
          <svg fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <circle cx="3" cy="3" r="3" fill="currentColor" />
          </svg>
      </span>
      </p>
      <div className={styles.userRow}>
        <div className={styles.maskContainer}>
          <div
            className={styles.maskedImage}
            style={{ maskImage: `url('${maskImg}')` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/user-headshot.png" alt="" />
          </div>
        </div>
        <span className={styles.userName}>Sade</span>
      </div>
    </div>
  );
}
