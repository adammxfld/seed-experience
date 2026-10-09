import { useCallback, useEffect, useState } from 'react';
import styles from './Screen.module.scss';
import { Slideshow } from './Slideshow';
import { FILMSTRIP, JOURNEY_STEPS, STEP_MAP, TIMING, stepToFilmstripIndex } from './journey.config';
import type { ColorMode } from './journey.config';
import { TimelineControl } from '../TimelineControl';
import { Icon } from '../Icons/Icon';

export type { ColorMode };

// Backward navigation: fade out, jump while hidden, fade back in.
// REWIND_FADE_DURATION must match $rewind-fade-duration in styles/_timing.scss
const REWIND_FADE_DURATION = 450;
const REWIND_SETTLE_DURATION = 100;

interface ScreenProps {
  mode?: ColorMode;
  onSlideChange?: (index: number) => void;
}

export function Screen({ mode = 'light', onSlideChange }: ScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  // Destination of an in-progress backward jump; null when not rewinding
  const [rewindTarget, setRewindTarget] = useState<number | null>(null);

  // Notify parent of filmstrip index changes (autoplay or manual)
  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  // Autoplay — two-phase: trigger exit animation, then advance
  useEffect(() => {
    if (!isPlaying || rewindTarget !== null) return;
    if (currentIndex >= FILMSTRIP.length - 1) {
      setIsPlaying(false);
      return;
    }

    const frame = FILMSTRIP[currentIndex];
    const interval = frame?.delay ?? TIMING.autoplayInterval;
    const exitDuration = frame?.exitDuration ?? 0;
    const holdTime = interval - exitDuration;

    const exitTimer = setTimeout(() => {
      if (exitDuration > 0) setIsExiting(true);
    }, holdTime);

    const advanceTimer = setTimeout(() => {
      setIsExiting(false);
      setCurrentIndex((prev) => prev + 1);
    }, interval);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(advanceTimer);
    };
  }, [isPlaying, currentIndex, rewindTarget]);

  // Rewind — two-phase: jump once the fade-out has finished, then fade back in
  useEffect(() => {
    if (rewindTarget === null) return;

    const jumpTimer = setTimeout(() => {
      setCurrentIndex(rewindTarget);
    }, REWIND_FADE_DURATION);

    const revealTimer = setTimeout(() => {
      setRewindTarget(null);
    }, REWIND_FADE_DURATION + REWIND_SETTLE_DURATION);

    return () => {
      clearTimeout(jumpTimer);
      clearTimeout(revealTimer);
    };
  }, [rewindTarget]);

  // Forward moves animate as usual; backward moves go through the rewind fade
  const goTo = useCallback((index: number) => {
    if (rewindTarget !== null || index < currentIndex) {
      setRewindTarget(index);
    } else {
      setCurrentIndex(index);
    }
  }, [currentIndex, rewindTarget]);

  // TimelineControl click → jump to that step's first filmstrip frame
  const handleStepChange = useCallback((stepIndex: number) => {
    setIsExiting(false);
    goTo(stepToFilmstripIndex(stepIndex));
    setIsPlaying(false);
  }, [goTo]);

  const handleTogglePlay = useCallback(() => {
    setIsExiting(false);
    setIsPlaying((prev) => {
      if (!prev && currentIndex >= FILMSTRIP.length - 1) {
        goTo(0);
      }
      return !prev;
    });
  }, [currentIndex, goTo]);

  // Manual advance from "Dive Deeper" buttons
  const handleAdvance = useCallback(() => {
    if (currentIndex < FILMSTRIP.length - 1) {
      setIsExiting(false);
      setCurrentIndex((prev) => prev + 1);
      setIsPlaying(false);
    }
  }, [currentIndex]);

  // Map filmstrip index to fractional step for TimelineControl
  // During a rewind the timeline moves to the destination straight away
  const currentStep = STEP_MAP[rewindTarget ?? currentIndex] ?? 0;

  // 'out' while fading out, 'jump' once the index has been reset (still hidden)
  const rewindPhase =
    rewindTarget === null ? undefined : currentIndex === rewindTarget ? 'jump' : 'out';

  return (
    <div
      className={`${styles.root} ${mode === 'dark' ? styles.dark : ''}`}
      data-rewinding={rewindPhase}
    >
      <Slideshow currentIndex={currentIndex} isExiting={isExiting} onAdvance={handleAdvance} />
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
