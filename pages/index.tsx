import { useState, useCallback } from 'react';
import styles from './index.module.scss';
import { Header, AccountSubheader } from '@/components/Headers';
import { Screen } from '@/components/JourneyScreen';
import { Footer } from '@/components/Footer';
import { isDarkSlide } from '@/components/JourneyScreen/Slideshow';
import type { ColorMode } from '@/components/JourneyScreen/Screen';

export default function Home() {
  const [colorMode, setColorMode] = useState<ColorMode>('light');

  const handleSlideChange = useCallback((index: number) => {
    setColorMode(isDarkSlide(index) ? 'dark' : 'light');
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main} data-mode={colorMode}>
        <Header mode={colorMode} />
        <AccountSubheader mode={colorMode} />
        <Screen mode={colorMode} onSlideChange={handleSlideChange} />
        <Footer />
      </main>
    </div>
  );
}
