import styles from './UserProfile.module.scss';

import { imgHeadshot as maskImg } from './imports/svg-a5sg4';

export function UserProfile() {
  return (
    <div className={styles.root}>
      <p className={styles.welcomeText}>Welcome bac</p>
      <div className={styles.userRow}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatarBackground} />
          <div className={styles.maskContainer}>
            <div
              className={styles.maskedImage}
              style={{ maskImage: `url('${maskImg}')` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/user-headshot.png" alt="" />
            </div>
          </div>
        </div>
        <p className={styles.userName}>Sade</p>
      </div>
      <div className={styles.dot}>
        <svg fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <circle cx="3" cy="3" r="3" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
