import React, { useEffect } from 'react';
import 'aframe';

const MoabImpl = () => {
  useEffect(() => {
    // Ensure A-Frame is loaded
    require('aframe');

    // Add interaction to play video on user interaction
    const video = document.querySelector('#video');
    const playVideo = () => {
      video.play();
      document.removeEventListener('click', playVideo);
    };
    document.addEventListener('click', playVideo);
  }, []);

  return (
    <a-scene>
      <a-assets>
        <video id="video" autoPlay loop src="https://d13wrvtzk1buxr.cloudfront.net/360_images/arches.mp4" webkit-playsinline playsinline></video>
      </a-assets>

      <a-videosphere src="#video" rotation="0 -90 0"></a-videosphere>
    </a-scene>
  );
};

export default MoabImpl;