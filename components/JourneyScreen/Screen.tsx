import styles from './Screen.module.scss';
import { Slideshow } from './Slideshow';

export type ColorMode = 'light' | 'dark';

interface ScreenProps {
  mode?: ColorMode;
  onSlideChange?: (index: number) => void;
}

export function Screen({ mode = 'light', onSlideChange }: ScreenProps) {
  return (
    <div className={`${styles.root} ${mode === 'dark' ? styles.dark : ''}`}>
      <Slideshow onSlideChange={onSlideChange} />
    </div>
  );
}
