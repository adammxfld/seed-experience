import { useState, useCallback } from 'react';
import styles from './index.module.scss';
import { Header, AccountSubheader } from '@/components/Headers';
import { Screen } from '@/components/JourneyScreen';
import { Footer } from '@/components/Footer';
import { getSlideMode } from '@/components/JourneyScreen/journey.config';
import type { ColorMode } from '@/components/JourneyScreen/Screen';

export default function Home() {
  const [colorMode, setColorMode] = useState<ColorMode>('light');

  const handleSlideChange = useCallback((index: number) => {
    setColorMode(getSlideMode(index));
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
