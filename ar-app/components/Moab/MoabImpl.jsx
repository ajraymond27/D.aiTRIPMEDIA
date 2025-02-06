import React, { useEffect, useState } from 'react';
import 'aframe';

const MoabImpl = () => {
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (isStarted) {
      const video = document.querySelector('#video');
      video.play();
    }
  }, [isStarted]);

  const handleStart = async () => {
    // Request device motion permissions for iOS
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceMotionEvent.requestPermission();
        if (permission !== 'granted') {
          alert('Motion access denied. The experience may not work properly.');
          return;
        }
      } catch (error) {
        console.error('Error requesting motion permission:', error);
      }
    }

    // Start the video
    setIsStarted(true);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {!isStarted && (
        <div 
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 10
          }}
          onClick={handleStart}
        >
          Tap to Start
        </div>
      )}
      <a-scene>
        <a-assets>
          <video id="video" loop src="https://dzca54yadzmkj.cloudfront.net/360_videos/arches.mp4" webkit-playsinline="webkit-playsinline" playsInline="playsInline"></video>
        </a-assets>
        <a-videosphere src="#video" rotation="0 -90 0"></a-videosphere>
      </a-scene>
    </div>
  );
};

export default MoabImpl;
