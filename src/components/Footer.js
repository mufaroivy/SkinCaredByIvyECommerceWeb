import React from 'react';
import styles from './Footer.module.css'; // Create Footer.module.css

function Footer({ companyName }) {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
    </footer>
  );
}

export default Footer;