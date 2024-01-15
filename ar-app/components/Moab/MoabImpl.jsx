import { useRef, useEffect } from 'react';
import { Entity, Scene } from 'aframe-react';

const AFrameSceneImpl = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      video.addEventListener('click', function() {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });
    }
  }, []);

  return (
    <Scene>
      <Entity>
        <a-assets>
          <video
            id="video"
            crossOrigin="anonymous"
            playsInline
            loop
            ref={videoRef}
          >
            <source
              src="https://bitmovin-a.akamaihd.net/content/playhouse-vr/progressive.mp4"
              type="video/mp4"
            />
          </video>
        </a-assets>
        <Entity
          rotation="0 -90 0"
          src="#video"
          visible="false"
          play-on-click
        />
        <Entity camera>
          <Entity
            position="0 0 -1.5"
            text={{
              align: 'center',
              width: 6,
              wrapCount: 100,
              color: 'white',
              value: 'Click or tap to start video'
            }}
            hide-on-play="#video"
          />
        </Entity>
      </Entity>
    </Scene>
  );
};

export default AFrameSceneImpl;