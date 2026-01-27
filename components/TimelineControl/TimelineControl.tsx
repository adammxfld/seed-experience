import { useState, useCallback, useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import styles from './TimelineControl.module.scss';
import { Icon } from '../Icons/Icon';

type ColorMode = 'light' | 'dark';

export interface Step {
  label: string;
}

interface TimelineControlProps {
  steps: Step[];
  mode?: ColorMode;
  currentStep?: number;
  defaultStep?: number;
  onStepChange?: (stepIndex: number) => void;
}

export function TimelineControl({
  steps,
  mode = 'light',
  currentStep: controlledStep,
  defaultStep = 0,
  onStepChange,
}: TimelineControlProps) {
  const [internalStep, setInternalStep] = useState(defaultStep);
  const [sliderLeft, setSliderLeft] = useState(0);

  const isControlled = controlledStep !== undefined;
  const activeStep = isControlled ? controlledStep : internalStep;
  const activeStepFloor = Math.floor(activeStep);

  const rootRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [ready, setReady] = useState(false);

  const updateStep = useCallback((newStep: number) => {
    if (!isControlled) {
      setInternalStep(newStep);
    }
    onStepChange?.(newStep);
  }, [isControlled, onStepChange]);

  const handleNext = useCallback(() => {
    const nextStep = activeStepFloor + 1;
    if (nextStep <= steps.length - 1) {
      updateStep(nextStep);
    }
  }, [activeStepFloor, steps.length, updateStep]);

  const handlePrevious = useCallback(() => {
    // If partway through a step, go to its start; otherwise go to previous
    const prevStep = activeStep > activeStepFloor ? activeStepFloor : activeStepFloor - 1;
    if (prevStep >= 0) {
      updateStep(prevStep);
    }
  }, [activeStep, activeStepFloor, updateStep]);

  const handleStepClick = useCallback((stepIndex: number) => {
    updateStep(stepIndex);
  }, [updateStep]);

  // Grid columns: auto 1fr auto 1fr ... auto
  // Steps get auto (text width), lines get 1fr (equal width)
  const gridTemplateColumns = useMemo(() => {
    return steps.map((_, i) =>
      i < steps.length - 1 ? 'auto 1fr' : 'auto'
    ).join(' ');
  }, [steps.length]);

  // Calculate slider position — supports fractional activeStep via interpolation
  const updateSliderPosition = useCallback(() => {
    const root = rootRef.current;
    const nav = navRef.current;
    if (!root || !nav || steps.length <= 1) return;

    const rootRect = root.getBoundingClientRect();
    const lastStepIndex = steps.length - 1;

    // Position for any integer step index
    const getPos = (step: number): number | null => {
      if (step >= lastStepIndex) {
        const el = stepRefs.current[lastStepIndex];
        if (!el) return null;
        return el.getBoundingClientRect().left - rootRect.left - nav.offsetWidth;
      }
      const line = lineRefs.current[step];
      if (!line) return null;
      return line.getBoundingClientRect().left - rootRect.left;
    };

    const floor = Math.floor(activeStep);
    const ceil = Math.ceil(activeStep);
    const fraction = activeStep - floor;

    if (fraction === 0) {
      const pos = getPos(floor);
      if (pos !== null) setSliderLeft(pos);
    } else {
      const startPos = getPos(floor);
      const endPos = getPos(ceil);
      if (startPos !== null && endPos !== null) {
        setSliderLeft(startPos + fraction * (endPos - startPos));
      }
    }
  }, [activeStep, steps.length]);

  // Calculate position before paint so the first frame is correct
  useLayoutEffect(() => {
    updateSliderPosition();

    const root = rootRef.current;
    if (!root) return;

    const observer = new ResizeObserver(() => {
      updateSliderPosition();
    });
    observer.observe(root);

    return () => observer.disconnect();
  }, [updateSliderPosition]);

  // Enable transitions only after the first paint at the correct position
  useEffect(() => {
    setReady(true);
  }, []);

  if (steps.length === 0) return null;

  const lineCount = steps.length - 1;

  return (
    <div ref={rootRef} className={`${styles.root} ${mode === 'dark' ? styles.dark : ''}`}>
      <ul className={styles.stepList} style={{ gridTemplateColumns }}>
        {steps.map((step, index) => (
          <li key={index} className={styles.stepItem}>
            <button
              ref={(el) => { stepRefs.current[index] = el; }}
              className={`${styles.step} ${index === activeStepFloor ? styles.active : ''} ${index < activeStepFloor ? styles.completed : ''}`}
              onClick={() => handleStepClick(index)}
            >
              {step.label}
            </button>
            {index < lineCount && (
              <div
                ref={(el) => { lineRefs.current[index] = el; }}
                className={`${styles.line} ${index < activeStepFloor ? styles.active : ''}`}
              />
            )}
          </li>
        ))}
      </ul>

      {/* Navigation slider */}
      <div
        ref={navRef}
        className={styles.navButton}
        style={{
          transform: `translateX(${sliderLeft}px)`,
          ...(ready ? {} : { transition: 'none' }),
        }}
      >
        <button
          className={styles.button}
          onClick={handlePrevious}
          disabled={activeStep <= 0}
          aria-label="Previous step"
        >
          <Icon name="chevronLeft" className={styles.icon} />
        </button>
        <button
          className={styles.button}
          onClick={handleNext}
          disabled={activeStepFloor >= steps.length - 1}
          aria-label="Next step"
        >
          <Icon name="chevronRight" className={styles.icon} />
        </button>
      </div>
    </div>
  );
}
