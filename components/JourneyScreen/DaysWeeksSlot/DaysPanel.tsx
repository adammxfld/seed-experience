import { useEffect, useRef } from 'react';
import { Icon } from '@/components/Icons';
import styles from './DaysPanel.module.scss';

interface DaysPanelProps {
  isVisible?: boolean;
  onAdvance?: () => void;
}

export default function DaysPanel({ isVisible = false, onAdvance }: DaysPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // The video is not fetched on page load (preload="none")
  // Starts downloading and playing when the panel becomes visible - pauses after
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible]);

  return (
    <div className={`${styles.panel} ${isVisible ? styles.isVisible : ''}`}>
      <div className={styles.panelContent}>
        <div className={styles.headingColumn}>
          <h3>In Your First <span>7 Days</span></h3>
        </div>
        <div className={styles.movieColumn}>
          <div className={styles.videoMask}>
            <video
              ref={videoRef}
              className={styles.video}
              src="/assets/video/GutBarrierVideo.mp4"
              preload="none"
              loop
              muted
              playsInline
            />
          </div>
        </div>
        <div className={styles.copyColumn}>
          <h4>You experienced a reduction in bloating and gas.</h4>
          <p>DS-01® has reduced bloating, eased gas, and minimized digestive discomfort—helping your gut work its best.</p>
          <button onClick={onAdvance}><Icon name={'arrowRt'} />Dive Deeper</button>
        </div>
      </div>
    </div>
  );
}
