import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Slideshow.module.scss';

// Temporary frame images
const frames = [
  '/assets/frames-temp/1.png',
  '/assets/frames-temp/2.png',
  '/assets/frames-temp/3.png',
  '/assets/frames-temp/4.png',
  '/assets/frames-temp/5.png',
  '/assets/frames-temp/6.png',
  '/assets/frames-temp/7.png',
];

// Slides 4-7 (indexes 3-6) have dark backgrounds
export const DARK_SLIDES = [3, 4, 5, 6];

export function isDarkSlide(index: number): boolean {
  return DARK_SLIDES.includes(index);
}

interface SlideshowProps {
  onSlideChange?: (index: number) => void;
}

interface SlideProps {
  src: string;
  alt: string;
}

function Slide({ src, alt }: SlideProps) {
  return (
    <div className={styles.slide}>
      <img src={src} alt={alt} className={styles.slideImage} />
    </div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function Slideshow({ onSlideChange }: SlideshowProps) {
  const [[currentIndex, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < frames.length) {
      setPage([newIndex, newDirection]);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const midpoint = rect.width / 2;

    if (clickX > midpoint) {
      // Clicked right side - go to next
      paginate(1);
    } else {
      // Clicked left side - go to previous
      paginate(-1);
    }
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.slideWrapper}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className={styles.motionSlide}
          >
            <Slide src={frames[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation indicators */}
      <div className={styles.indicators}>
        {frames.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              const newDirection = index > currentIndex ? 1 : -1;
              setPage([index, newDirection]);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Click zone hints */}
      <div className={styles.clickZones}>
        <div className={`${styles.zone} ${styles.zoneLeft} ${currentIndex === 0 ? styles.disabled : ''}`} />
        <div className={`${styles.zone} ${styles.zoneRight} ${currentIndex === frames.length - 1 ? styles.disabled : ''}`} />
      </div>
    </div>
  );
}
