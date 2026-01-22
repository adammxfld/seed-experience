import styles from './index.module.scss';
import { Header, AccountSubheader } from '@/components/Headers';
import { Screen } from '@/components/JourneyScreen';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <AccountSubheader />
        <Screen />
        <Footer />
      </main>
    </div>
  );
}
