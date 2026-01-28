import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import slideStyles from "../Slide.module.scss";
import styles from "./IntroSlot.module.scss";

export const INTRO_SLOT_MODE = "light" as const;

interface IntroSlotProps {
  isVisible?: boolean;
}

function IntroStatements() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={styles.introStatements}>
      <motion.div
        className={styles.statement1}
        initial={{ opacity: 0, y: -20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className={styles.textLine}>It's the 26<span className={styles.superscript}>th</span> of November.</p>
      </motion.div>

      <motion.div
        className={styles.statement2}
        initial={{ opacity: 0, y: -20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
      >
        <p className={styles.textLine}>You're 3 months in this journey.</p>
      </motion.div>

      <motion.div
        className={styles.statement3}
        initial={{ opacity: 0, y: -20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 2.4 }}
      >
        <p className={styles.textLine}>And results are taking <span>Shape</span></p>
      </motion.div>
    </div>
  );
}

export default function IntroSlot({ isVisible = true }: IntroSlotProps) {
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
        <IntroStatements />
      </div>
    </div>
  );
}
