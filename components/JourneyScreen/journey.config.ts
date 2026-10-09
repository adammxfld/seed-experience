import type { Step } from '../TimelineControl';

// ---------------------------------------------------------------------------
// Journey definition: the frames, their timeline labels and timing, plus the
// lookup tables derived from them. Edit FRAMES to change the journey.
// ---------------------------------------------------------------------------

export type ColorMode = 'light' | 'dark';

/** Options shared by every frame */
interface FrameOptions {
  mode?: ColorMode;
  /** How long autoplay holds on this frame (defaults to TIMING.autoplayInterval) */
  delay?: number;
  /** How long before advancing the exit animation starts */
  exitDuration?: number;
}

type FrameConfig =
  | (FrameOptions & { type: 'intro'; label: string })
  | (FrameOptions & { type: 'image'; label: string; src: string })
  | (FrameOptions & { type: 'sequence'; label: string; children: string[] })
  // One slide with two panel positions, each its own timeline step
  | (FrameOptions & { type: 'daysweeks'; labels: [string, string] });

export type FilmstripItem =
  | (FrameOptions & { type: 'intro' })
  | (FrameOptions & { type: 'image'; src: string })
  | (FrameOptions & { type: 'daysweeks'; position: number });

/** Filmstrip pauses on each slide before autoplay advances */
export const TIMING = {
  autoplayInterval: 6000,
};

export const FRAMES: FrameConfig[] = [
  { type: 'intro', label: '【 Intro 】', mode: 'light', delay: 5000, exitDuration: 1000 },
  { type: 'daysweeks', labels: ['【 First 7 Days 】', '【 Weeks 2–4 】'], mode: 'light' },
  {
    type: 'sequence',
    label: '【 3 Months 】',
    children: [
      '/assets/frames-temp/4-1.png',
      '/assets/frames-temp/4-2.png',
      '/assets/frames-temp/4-3.png',
    ],
    mode: 'dark',
  },
  { type: 'image', label: "【 What's Next 】", src: '/assets/frames-temp/5.png', mode: 'light' },
  { type: 'image', label: '【  】', src: '/assets/frames-temp/6.png', mode: 'dark' },
];

/** Timeline steps, in order, taken from the frame labels. */
export const JOURNEY_STEPS: Step[] = FRAMES.flatMap((frame) =>
  frame.type === 'daysweeks'
    ? frame.labels.map((label) => ({ label }))
    : [{ label: frame.label }],
);

/** Flat list of filmstrip items for the track. */
function flattenFrames(frames: FrameConfig[]): FilmstripItem[] {
  return frames.flatMap<FilmstripItem>((frame) => {
    if (frame.type === 'intro') {
      return [{ type: 'intro', mode: frame.mode, delay: frame.delay, exitDuration: frame.exitDuration }];
    }

    if (frame.type === 'daysweeks') {
      // Expand to 2 filmstrip items (one per panel position)
      return [
        { type: 'daysweeks', position: 0, mode: frame.mode, delay: frame.delay, exitDuration: frame.exitDuration },
        { type: 'daysweeks', position: 1, mode: frame.mode },
      ];
    }

    if (frame.type === 'sequence') {
      return frame.children.map((src, i) => ({
        type: 'image', src, mode: frame.mode,
        // Only the first child of a sequence inherits the delay/exitDuration
        ...(i === 0 && frame.delay != null ? { delay: frame.delay } : {}),
        ...(i === 0 && frame.exitDuration != null ? { exitDuration: frame.exitDuration } : {}),
      }));
    }

    return [{ type: 'image', src: frame.src, mode: frame.mode, delay: frame.delay, exitDuration: frame.exitDuration }];
  });
}

/** Maps each filmstrip index to a (possibly fractional) step index. */
function buildStepMap(frames: FrameConfig[]): number[] {
  const map: number[] = [];
  let stepIndex = 0;
  frames.forEach((frame) => {
    if (frame.type === 'daysweeks') {
      // daysweeks has 2 positions, each is a separate step
      map.push(stepIndex);
      map.push(stepIndex + 1);
      stepIndex += 2;
    } else if (frame.type === 'sequence') {
      frame.children.forEach((_, childIdx) => {
        if (childIdx === 0) {
          map.push(stepIndex);
        } else if (childIdx === frame.children.length - 1) {
          map.push(stepIndex + 0.45);
        } else {
          map.push(stepIndex + 0.2);
        }
      });
      stepIndex += 1;
    } else {
      map.push(stepIndex);
      stepIndex += 1;
    }
  });
  return map;
}

/** Returns the filmstrip index for the first frame of a given step. */
export function stepToFilmstripIndex(stepIndex: number): number {
  let filmstripIdx = 0;
  let currentStep = 0;
  for (const frame of FRAMES) {
    if (currentStep >= stepIndex) break;
    if (frame.type === 'daysweeks') {
      // daysweeks produces 2 filmstrip items for 2 steps
      const stepsInFrame = 2;
      const stepsToAdvance = Math.min(stepsInFrame, stepIndex - currentStep);
      filmstripIdx += stepsToAdvance;
      currentStep += stepsToAdvance;
    } else if (frame.type === 'sequence') {
      filmstripIdx += frame.children.length;
      currentStep += 1;
    } else {
      filmstripIdx += 1;
      currentStep += 1;
    }
  }
  return filmstripIdx;
}

export const FILMSTRIP = flattenFrames(FRAMES);
export const STEP_MAP = buildStepMap(FRAMES);

export function getSlideMode(index: number): ColorMode {
  return FILMSTRIP[index]?.mode ?? 'light';
}

/** A slot on the track - consecutive daysweeks items share one slot */
export type VisualSlot =
  | { type: 'intro' }
  | { type: 'image'; src: string }
  | { type: 'daysweeks'; filmstripStart: number };

function buildVisualSlots(filmstrip: FilmstripItem[]): VisualSlot[] {
  const slots: VisualSlot[] = [];
  let i = 0;
  while (i < filmstrip.length) {
    const item = filmstrip[i];
    if (item.type === 'daysweeks') {
      slots.push({ type: 'daysweeks', filmstripStart: i });
      // Skip all consecutive daysweeks items
      while (i < filmstrip.length && filmstrip[i].type === 'daysweeks') i++;
    } else if (item.type === 'intro') {
      slots.push({ type: 'intro' });
      i++;
    } else {
      slots.push({ type: 'image', src: item.src });
      i++;
    }
  }
  return slots;
}

export const VISUAL_SLOTS = buildVisualSlots(FILMSTRIP);

/** Maps filmstrip index to visual slot index */
export function filmstripToVisualSlot(filmstripIndex: number): number {
  let slotIndex = 0;
  let filmIdx = 0;
  while (filmIdx < filmstripIndex && slotIndex < VISUAL_SLOTS.length) {
    const slot = VISUAL_SLOTS[slotIndex];
    if (slot.type === 'daysweeks') {
      // Count how many filmstrip items this daysweeks slot spans
      const start = slot.filmstripStart;
      let end = start;
      while (end < FILMSTRIP.length && FILMSTRIP[end].type === 'daysweeks') end++;
      if (filmstripIndex < end) {
        return slotIndex; // Still within this daysweeks slot
      }
      filmIdx = end;
    } else {
      filmIdx++;
    }
    slotIndex++;
  }
  return slotIndex;
}
