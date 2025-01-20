import React, { useEffect } from 'react';

const VideoSphereScene = () => {
  useEffect(() => {
    if (!AFRAME.components['play-on-click']) {
      AFRAME.registerComponent('play-on-click', {
        init: function () {
          const videoEl = document.querySelector('#myVideo');
          this.el.addEventListener('click', function () {
            if (videoEl.paused) {
              videoEl.play();
            }
          });
        },
      });
    }
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
          <a-scene>
            <a-assets>
              <video
                id="myVideo"
                autoplay
                loop
                playsinline
                webkit-playsinline
                crossorigin="anonymous"
                src="/moab_test.mp4"
              ></video>
            </a-assets>
            <a-videosphere src="#myVideo" play-on-click></a-videosphere>
          </a-scene>
        `,
      }}
    />
  );
};

export default VideoSphereScene;
