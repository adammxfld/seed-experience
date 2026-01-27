import { useCallback, useEffect, useState } from 'react';
import styles from './Screen.module.scss';
import { Slideshow, FILMSTRIP, STEP_MAP, TIMING, stepToFilmstripIndex } from './Slideshow';
import { TimelineControl } from '../TimelineControl';
import { Icon } from '../Icons/Icon';
import type { Step } from '../TimelineControl';

export type ColorMode = 'light' | 'dark';

const JOURNEY_STEPS: Step[] = [
  { label: '【 Intro 】' },
  { label: '【 First 7 Days 】' },
  { label: '【 Weeks 2–4 】' },
  { label: '【 3 Months 】' },
  { label: "【 What's Next 】" },
  { label: '【  】' },
];

interface ScreenProps {
  mode?: ColorMode;
  onSlideChange?: (index: number) => void;
}

export function Screen({ mode = 'light', onSlideChange }: ScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Notify parent of filmstrip index changes (autoplay or manual)
  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  // Autoplay — uniform interval per filmstrip slide
  useEffect(() => {
    if (!isPlaying) return;
    if (currentIndex >= FILMSTRIP.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, TIMING.autoplayInterval);

    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex]);

  // TimelineControl click → jump to that step's first filmstrip frame
  const handleStepChange = useCallback((stepIndex: number) => {
    setCurrentIndex(stepToFilmstripIndex(stepIndex));
    setIsPlaying(false);
  }, []);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      if (!prev && currentIndex >= FILMSTRIP.length - 1) {
        setCurrentIndex(0);
      }
      return !prev;
    });
  }, [currentIndex]);

  // Map filmstrip index to fractional step for TimelineControl
  const currentStep = STEP_MAP[currentIndex] ?? 0;

  return (
    <div className={`${styles.root} ${mode === 'dark' ? styles.dark : ''}`}>
      <Slideshow currentIndex={currentIndex} />
      <div className={styles.timeline}>
        <TimelineControl
          steps={JOURNEY_STEPS}
          mode={mode}
          currentStep={currentStep}
          onStepChange={handleStepChange}
        />
        <button
          className={styles.pauseButton}
          onClick={handleTogglePlay}
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          <Icon name={isPlaying ? 'pause' : 'slideshowPlay'} />
        </button>
      </div>
    </div>
  );
}
