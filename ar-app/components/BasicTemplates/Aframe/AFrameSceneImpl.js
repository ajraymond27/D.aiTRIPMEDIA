import 'aframe';
import {Entity} from 'aframe-react';
import {useState} from 'react';

const AframeSceneImpl = () => {
  const [imageSrc, setImageSrc] = useState('/grateful_dead.png');

  const handleImageChange = (e) => {
    setImageSrc(e.target.value);
  };

  return (
    <Entity>
      <a-scene>
        <a-sky src={imageSrc}></a-sky>
      </a-scene>
      <input type="text" onChange={handleImageChange} value={imageSrc}/>
    </Entity>
  );
};

export default AframeSceneImpl;
