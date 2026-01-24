import React from 'react';
import styles from './FooterLinks.module.scss';

interface LinkProps {
  label: string;
  active?: boolean;
}

const Link: React.FC<LinkProps> = ({ label, active = false }) => {
  return (
    <li className={`${styles.link} ${active ? styles.active : ''}`}>
      <a href="#">{label}</a>
    </li>
  );
};

const FooterLinks: React.FC = () => {
  return (
    <nav className={styles.footerNav}>
      <ul className={styles.footerLinksWrapper}>
        <Link label="For You" active />
        <Link label="Rewards" />
        <Link label="Subscriptions" />
        <Link label="Order History" />
        <Link label="Settings" />
      </ul>
    </nav>
  );
};

export default FooterLinks;
