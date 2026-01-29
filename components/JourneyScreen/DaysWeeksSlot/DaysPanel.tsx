import styles from './DaysPanel.module.scss';

export default function DaysPanel() {
  return (
    <div className={styles.panel}>
      <div className={styles.panelContent}>
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
  );
}
