import styles from './Slide.module.scss';

interface SlideProps {
  src: string;
  alt: string;
  isVisible: boolean;
}

export function Slide({ src, alt, isVisible }: SlideProps) {
  if (!isVisible) {
    return (
      <div className={styles.slide}>
        <div className={styles.placeholder} />
      </div>
    );
  }

  return (
    <div className={styles.slide}>
      <img src={src} alt={alt} className={styles.slideImage} />
    </div>
  );
}
