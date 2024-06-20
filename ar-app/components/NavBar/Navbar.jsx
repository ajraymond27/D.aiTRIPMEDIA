// components/Navbar.jsx
import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>DAI TRIP</div>
      <div className={styles.navLinks}>
        <a href="https://www.daitripmedia.com/">HOME</a>
        <a href="https://www.daitripmedia.com/merch">MERCH</a>
        <a href="https://www.daitripmedia.store/browse/">PRINTS</a>
      </div>
    </nav>
  );
};

export default Navbar;
