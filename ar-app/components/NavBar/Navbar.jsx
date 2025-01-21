// components/Navbar.jsx
import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Navbar.module.css';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <Link href="https://www.daitripmedia.com/">
          <Image src="/logo.png" alt="DAI TRIP Logo" className={styles.logoImage} width={160} height={40}/>
        </Link>
        <div className={styles.navLinks}>
          <a href="https://www.daitripmedia.com/">HOME</a>
          <a href="https://www.daitripmedia.store/browse/">PRINTS</a>
          <a href="https://www.daitripmedia.com/merch">MERCH</a>
      </div>
    </nav>
  );
};

export default Navbar;
