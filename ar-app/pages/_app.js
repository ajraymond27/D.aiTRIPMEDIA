// pages/_app.jsx
import React from 'react';
import '../styles/globals.css';
import '@fontsource/oswald'; // Import the Oswald font
import Navbar from '../components/NavBar/Navbar';
import MobileNavbar from '../components/NavBar/MobileNavbar';
import { useMediaQuery } from 'react-responsive';
import { SpeedInsights } from "@vercel/speed-insights/next"

function MyApp({ Component, pageProps }) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      {isMobile ? <MobileNavbar /> : <Navbar />}
      <SpeedInsights/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
