import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import slideStyles from "../Slide.module.scss";
import styles from "./IntroSlot.module.scss";

export const INTRO_SLOT_MODE = "light" as const;
export const INTRO_SLOT_DELAY = 5000;
export const INTRO_SLOT_EXIT_DURATION = 1000;

interface IntroSlotProps {
  isVisible?: boolean;
  isActive?: boolean;
}

function IntroStatements({ isActive = true }: { isActive?: boolean }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.div
      className={styles.introStatements}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        className={styles.statement1}
        initial={{ opacity: 0, y: 0 }}
        animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <p className={styles.textLine}>It's the 26<span className={styles.superscript}>th</span> of November.</p>
      </motion.div>

      <motion.div
        className={styles.statement2}
        initial={{ opacity: 0, y: -20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 2, ease: "easeOut", delay: 1.2 }}
      >
        <p className={styles.textLine}>You're 3 months in this journey.</p>
      </motion.div>

      <motion.div
        className={styles.statement3}
        initial={{ opacity: 0, y: -20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 2, ease: "easeOut", delay: 2.4 }}
      >
        <p className={styles.textLine}>And results are taking <span>Shape</span></p>
      </motion.div>
    </motion.div>
  );
}

export default function IntroSlot({ isVisible = true, isActive = true }: IntroSlotProps) {
  if (!isVisible) {
    return (
      <div className={slideStyles.slide}>
        <div className={slideStyles.placeholder} />
      </div>
    );
  }

  return (
    <div className={slideStyles.slide}>
      <div className={styles.content}>
        <IntroStatements isActive={isActive} />
      </div>
      <div className={styles.videoFrame}>
        <video
          className={styles.video}
          src="/assets/video/timeline-loop-sm.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </div>
  );
}
