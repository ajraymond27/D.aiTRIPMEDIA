import 'aframe';

const AFrameSceneImpl = () => {
  return (
    <a-scene vr-mode-ui="enabled: false">
      <a-assets>
        <video id="video" crossOrigin="anonymous" playsInline webkit-playsinline="true" loop>
          <source src="https://d13wrvtzk1buxr.cloudfront.net/360_images/bow.MP4" type="video/mp4" />
        </video>
      </a-assets>
      <a-videosphere src="#video"></a-videosphere>
      <a-entity camera>
        <a-camera look-controls></a-camera>
      </a-entity>
      <a-entity video-controls></a-entity>
    </a-scene>
  );
};

export default AFrameSceneImpl;
