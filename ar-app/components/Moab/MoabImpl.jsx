import React, { useEffect, useState } from 'react';
import 'aframe';

const MoabImpl = () => {
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Load A-Frame only in the browser
    if (typeof window !== 'undefined') {
      require('aframe');
    }
  }, []);

  // Function to handle user click
  const handleStart = async () => {
    // Request motion/orientation permission (iOS Safari)
    if (
      typeof DeviceMotionEvent !== 'undefined' &&
      typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      try {
        const response = await DeviceMotionEvent.requestPermission();
        if (response !== 'granted') {
          // If user denies permission, you can show a warning or continue muted
          console.warn('Motion access denied. The experience may be limited.');
        }
      } catch (err) {
        console.error('Error requesting motion permission:', err);
      }
    }

    // Play the video after user interaction
    const videoEl = document.querySelector('#video');
    if (videoEl) {
      videoEl.play().catch((err) => {
        console.error('Video play failed:', err);
      });
    }

    setIsStarted(true);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* A-Frame Scene */}
      <a-scene device-orientation-permission-ui="enabled: false">
        <a-assets>
          <video
            id="video"
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline
            src="https://dzca54yadzmkj.cloudfront.net/360_videos/moab.mp4"
          ></video>
        </a-assets>
        <a-videosphere src="#video" rotation="0 -90 0"></a-videosphere>
      </a-scene>

      {/* Black Overlay if not started */}
      {!isStarted && (
        <div
          onClick={handleStart}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '2rem',
            cursor: 'pointer',
            zIndex: 9999,
          }}
        >
          Begin Dai TRIP
        </div>
      )}
    </div>
  );
};

export default MoabImpl;