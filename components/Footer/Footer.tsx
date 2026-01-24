import React from 'react';
import TreatmentPills from './TreatmentPills';
import FooterLinks from './FooterLinks';
import AudioPlayer from './AudioPlayer';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <TreatmentPills />
      <FooterLinks />
      <AudioPlayer />
    </footer>
  );
};

export default Footer;
