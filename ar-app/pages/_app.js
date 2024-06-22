// pages/_app.jsx
import React from 'react';
import '../styles/globals.css';
import '@fontsource/oswald'; // Import the Oswald font
import Navbar from '../components/NavBar/Navbar';
import MobileNavbar from '../components/NavBar/MobileNavbar';
import { useMediaQuery } from 'react-responsive';

function MyApp({ Component, pageProps }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      <Navbar />
      {isMobile ? <MobileNavbar /> : <Navbar />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
