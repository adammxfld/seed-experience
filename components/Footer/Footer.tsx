import React from 'react';
import TreatmentPills from './TreatmentPills';
import FooterLinks from './FooterLinks';
import AudioPlayer from './AudioPlayer';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerFeatures}>
        <TreatmentPills />
        <FooterLinks />
        <AudioPlayer />
      </div>
    </footer>
  );
};

export default Footer;
