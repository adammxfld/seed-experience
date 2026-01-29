import { useState } from 'react';
import styles from './DaysWeeksSlot.module.scss';

export const DAYS_WEEKS_MODE = 'light' as const;

interface DaysWeeksSlotProps {
  position: number; // 0 = left (First 7 Days), 1 = right (Weeks 2-4)
  isVisible?: boolean;
}

const SPHERE_MAX_SCALE = 2.135;

export default function DaysWeeksSlot({ position, isVisible = true }: DaysWeeksSlotProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Scale from 1 to SPHERE_MAX_SCALE as position goes from 0 to 1
  const sphereScale = 1 + position * (SPHERE_MAX_SCALE - 1);

  return (
    <div className={styles.container}>
      <div
        className={styles.track}
        style={{ transform: `translateX(-${position * 50}%)` }}
      >
        <img
          src="/assets/daysweeks-sphere.svg"
          alt=""
          className={styles.sphere}
          style={{ transform: `translateX(-${position * 38}%) translateY(-46.75%) scale(${sphereScale})` }}
        />

        {/* Left panel */}
        <div className={styles.panel}>
          <div className={styles.leftPanelContent}>
            <div className={styles.headingColumn}>
              <h3>In Your First <span>7 Days</span></h3>
            </div>
            <div className={styles.movieColumn}>
              <div className={styles.videoMask}>
                <video
                  className={styles.video}
                  src="/assets/video/GutBarrierVideo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>
            <div className={styles.copyColumn}>
              <h4>You experienced a reduction in bloating and gas.</h4>
              <p>DS-01® has reduced bloating, eased gas, and minimized digestive discomfort—helping your gut work its best.</p>
              <button>Dive Deeper</button>
            </div>
          </div>
        </div>

        {/* Right panel - temporary 3.png */}
        <div className={styles.panel}>
          {isVisible ? (
            <img
              src="/assets/frames-temp/3.png"
              alt="Weeks 2-4"
              className={styles.image}
              onLoad={() => setImageLoaded(true)}
              style={{ opacity: imageLoaded ? 1 : 0 }}
            />
          ) : (
            <div className={styles.placeholder} />
          )}
        </div>
      </div>
    </div>
  );
}
