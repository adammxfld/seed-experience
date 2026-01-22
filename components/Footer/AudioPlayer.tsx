import React from 'react';
import styles from './AudioPlayer.module.scss';

const AudioPlayer: React.FC = () => {
  return (
    <div className={styles.audioPlayerContainer}>
      {/* Waveform visualization */}
      <div className={styles.waveform}>
        <div className={`${styles.bar} ${styles.bar1}`} />
        <div className={`${styles.bar} ${styles.bar2}`} />
        <div className={`${styles.bar} ${styles.bar3}`} />
        <div className={`${styles.bar} ${styles.bar4}`} />
        <div className={`${styles.bar} ${styles.bar5}`} />
        <div className={`${styles.bar} ${styles.bar6}`} />
      </div>

      {/* Play button */}
      <div className={styles.playButtonWrapper}>
        <div className={styles.playButton}>
          <div className={styles.playButtonBorder} />
        </div>
        <div className={styles.playIcon}>
          <svg fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path
              d="M5.33333 3.33333L12 8L5.33333 12.6667V3.33333Z"
              fill="#1C3A13"
            />
          </svg>
        </div>
      </div>

      {/* Track info */}
      <div className={styles.trackInfo}>
        <p className={styles.trackTitle}>Bionic Frequencies</p>
        <p className={styles.trackArtist}>Seed</p>
      </div>

      {/* Menu icon */}
      <div className={styles.menuIcon}>
        <svg fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
          <path
            d="M6 0C6.82843 0 7.5 0.671573 7.5 1.5C7.5 2.32843 6.82843 3 6 3C5.17157 3 4.5 2.32843 4.5 1.5C4.5 0.671573 5.17157 0 6 0ZM6 5.5C6.82843 5.5 7.5 6.17157 7.5 7C7.5 7.82843 6.82843 8.5 6 8.5C5.17157 8.5 4.5 7.82843 4.5 7C4.5 6.17157 5.17157 5.5 6 5.5ZM7.5 12.5C7.5 11.6716 6.82843 11 6 11C5.17157 11 4.5 11.6716 4.5 12.5C4.5 13.3284 5.17157 14 6 14C6.82843 14 7.5 13.3284 7.5 12.5Z"
            fill="#1C3A13"
          />
        </svg>
      </div>
    </div>
  );
};

export default AudioPlayer;
