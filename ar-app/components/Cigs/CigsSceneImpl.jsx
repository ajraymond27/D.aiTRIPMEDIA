import 'aframe';
import { Entity } from 'aframe-react';
import { useState } from 'react';

const CigsSceneImpl = () => {
  const [imageSrc, setImageSrc] = useState('saloon.png');

  const handleImageChange = (e) => {
    setImageSrc(e.target.value);
  };

  return (
    <Entity>
      <a-scene>
        {/* Skybox */}
        <a-sky src={imageSrc} rotation="0 0 0" crossorigin="anonymous"></a-sky>

        {/* 3D Model with Animation */}
        <a-entity
          gltf-model="./cowboy.glb"
          animation-mixer="clip: Unsteady Walk; loop: repeat"
          position="0 0 -3"
          scale="1 1 1"
          rotation="0 0 0"
        ></a-entity>
      </a-scene>

      <input type="text" onChange={handleImageChange} value={imageSrc} />
    </Entity>
  );
};

export default CigsSceneImpl;
