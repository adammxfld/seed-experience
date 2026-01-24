import React from 'react';
import styles from './AudioPlayer.module.scss';
import { Icon } from '../Icons/Icon';

const AudioPlayer: React.FC = () => {
  return (
    <div className={styles.audioPlayerContainer}>
      <div className={styles.waveform}>
        <img src="/assets/svg-waveform.svg" alt="" aria-hidden="true" />
      </div>
      <div className={styles.trackInfo}>
        <p className={styles.trackTitle}>Bionic Frequencies</p>
        <p className={styles.trackArtist}>Seed</p>
      </div>
      <div className={styles.menuIcon}>
        <Icon name="audioMenu" />
      </div>
      <div className={styles.playIcon}>
        <Icon name="audioPlay" />
      </div>
    </div>
  );
};

export default AudioPlayer;
