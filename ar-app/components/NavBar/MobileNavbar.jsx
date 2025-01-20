// components/MobileNavbar.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles//MobileNavbar.module.css';
import Image from 'next/image';


const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.mobileNavbar}>
        <Link href="https://www.daitripmedia.com/">
          <Image src="/logo.png" alt="DAI TRIP Logo" className={styles.logoImage} />
        </Link>
        <div className={styles.menuIcon} onClick={toggleMenu}>
        {isOpen ? 'x' : '☰'}
      </div>
      {isOpen && (
        <div className={styles.navLinks}>
          <a href="https://www.daitripmedia.com/">HOME</a>
          <a href="https://www.daitripmedia.store/browse/">PRINTS</a>
          <a href="https://www.daitripmedia.com/merch">MERCH</a>
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
