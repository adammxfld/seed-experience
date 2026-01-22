import styles from './UserStats.module.scss';

import svgPaths from './imports/svg-f2fqqrtins';

export function UserStats() {
  return (
    <div className={styles.root}>
      <div className={styles.statCard}>
        <div className={styles.statHeader}>
          <div className={styles.iconContainer}>
            <div className={styles.iconInner}>
              <svg fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <g>
                  <path d={svgPaths.p47f6600} fill="#1C3A13" />
                  <path d={svgPaths.p3c746c00} fill="#1C3A13" />
                  <path d={svgPaths.pf766800} fill="#1C3A13" />
                </g>
              </svg>
            </div>
          </div>
          <p className={styles.statValue}>987</p>
        </div>
        <p className={styles.statLabel}>Points to Spend</p>
      </div>

      <div className={styles.statCard}>
        <div className={styles.statHeader}>
          <div className={styles.iconContainer}>
            <div className={styles.iconInner}>
              <svg fill="none" preserveAspectRatio="none" viewBox="0 0 20.0007 20">
                <g>
                  <path d={svgPaths.p15424f00} fill="#1C3A13" />
                  <path d={svgPaths.p39faaa00} fill="#1C3A13" />
                  <path d={svgPaths.p3e5d2600} fill="#1C3A13" />
                  <path d={svgPaths.p2813f00} fill="#1C3A13" />
                  <path d={svgPaths.p33e03100} fill="#1C3A13" />
                  <path d={svgPaths.p3964bf00} fill="#1C3A13" />
                  <path d={svgPaths.p11058100} fill="#1C3A13" />
                  <path d={svgPaths.p2044600} fill="#1C3A13" />
                  <path d={svgPaths.p299fd300} fill="#1C3A13" />
                  <path d={svgPaths.p1545600} fill="#1C3A13" />
                  <path d={svgPaths.p4a3da00} fill="#1C3A13" />
                  <path d={svgPaths.p1a237600} fill="#1C3A13" />
                </g>
              </svg>
            </div>
          </div>
          <p className={styles.statValue}>001</p>
        </div>
        <p className={styles.statLabel}>Subscriptions</p>
      </div>

      <div className={styles.statCard}>
        <div className={styles.statHeader}>
          <div className={styles.iconContainer}>
            <div className={`${styles.iconInner} ${styles.iconInnerRotated}`}>
              <svg fill="none" preserveAspectRatio="none" viewBox="0 0 20.0013 20.0001">
                <g>
                  <path d={svgPaths.p3abfcf00} fill="#1C3A13" />
                  <path d={svgPaths.p2a46c300} fill="#1C3A13" />
                  <path d={svgPaths.p23896400} fill="#1C3A13" />
                  <path d={svgPaths.p2a6f4400} fill="#1C3A13" />
                  <path d={svgPaths.p35499c80} fill="#1C3A13" />
                  <path d={svgPaths.p890fd00} fill="#1C3A13" />
                  <path d={svgPaths.p223bea80} fill="#1C3A13" />
                  <path d={svgPaths.p306aba00} fill="#1C3A13" />
                  <path d={svgPaths.p10f95f00} fill="#1C3A13" />
                  <path d={svgPaths.p95fba00} fill="#1C3A13" />
                  <path d={svgPaths.p25884600} fill="#1C3A13" />
                  <path d={svgPaths.p100d6a00} fill="#1C3A13" />
                  <path d={svgPaths.p1649df00} fill="#1C3A13" />
                  <path d={svgPaths.pda19600} fill="#1C3A13" />
                  <path d={svgPaths.p19d92100} fill="#1C3A13" />
                  <path d={svgPaths.p569fe80} fill="#1C3A13" />
                  <path d={svgPaths.p612cf00} fill="#1C3A13" />
                  <path d={svgPaths.p252bde80} fill="#1C3A13" />
                </g>
              </svg>
            </div>
          </div>
          <p className={styles.statValue}>024</p>
        </div>
        <p className={styles.statLabel}>Strains Delivered</p>
      </div>

      <div className={styles.statCard}>
        <div className={styles.statHeader}>
          <div className={styles.iconContainer}>
            <div className={styles.iconInner}>
              <svg fill="none" preserveAspectRatio="none" viewBox="0 0 18.2864 20">
                <g>
                  <path d={svgPaths.p1e2aa00} fill="#1C3A13" />
                  <path d={svgPaths.p3ef46d80} fill="#1C3A13" />
                  <path d={svgPaths.p250b5d00} fill="#1C3A13" />
                  <path d={svgPaths.p27a03400} fill="#1C3A13" />
                  <path d={svgPaths.p9c93300} fill="#1C3A13" />
                  <path d={svgPaths.pbe99a00} fill="#1C3A13" />
                </g>
              </svg>
            </div>
          </div>
          <p className={styles.statValue}>020</p>
        </div>
        <p className={styles.statLabel}>Nutrients Delivered</p>
      </div>
    </div>
  );
}
