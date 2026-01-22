import React from 'react';
import styles from './FooterLinks.module.scss';

interface TabProps {
  label: string;
  active?: boolean;
}

const Tab: React.FC<TabProps> = ({ label, active = false }) => {
  return (
    <div className={`${styles.tab} ${active ? styles.active : ''}`}>
      <p>{label}</p>
    </div>
  );
};

const FooterLinks: React.FC = () => {
  return (
    <div className={styles.footerLinksWrapper}>
      <div className={styles.backgroundShape}>
        <div className={styles.rotatedContainer}>
          <div className={styles.unionShape}>
            <svg fill="none" preserveAspectRatio="none" viewBox="0 0 48 458">
              <path
                d="M24 0C10.7452 0 0 10.7452 0 24V434C0 447.255 10.7452 458 24 458C37.2548 458 48 447.255 48 434V24C48 10.7452 37.2548 0 24 0Z"
                fill="rgba(87, 94, 85, 0.08)"
                style={{ filter: 'blur(75px)' }}
              />
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.tabsContainer}>
        <Tab label="For You" active />
        <Tab label="Rewards" />
        <Tab label="Subscriptions" />
        <Tab label="Order History" />
        <Tab label="Settings" />
      </div>
    </div>
  );
};

export default FooterLinks;
