// components/MobileNavbar.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/MobileNavbar.module.css'; // ✅ also fixed double slashes

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.mobileNavbar}>
      <Link href="/" passHref legacyBehavior>
        <a>
          <Image
            src="/logo.png"
            alt="DAI TRIP Logo"
            className={styles.logoImage}
            width={120}
            height={30}
            unoptimized // ✅ no auto-optimization to avoid hydration mismatch
            priority // ✅ load logo faster
          />
        </a>
      </Link>

      <div className={styles.menuIcon} onClick={toggleMenu}>
        {isOpen ? 'x' : '☰'}
      </div>

      {isOpen && (
        <div className={styles.navLinks}>
          <a href="https://www.daitripmedia.com/" target="_blank" rel="noopener noreferrer">HOME</a>
          <a href="https://www.daitripmedia.store/browse/" target="_blank" rel="noopener noreferrer">PRINTS</a>
          <a href="https://www.daitripmedia.com/merch" target="_blank" rel="noopener noreferrer">MERCH</a>
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
