import 'aframe';
import {Entity} from 'aframe-react';
import {useState} from 'react';

const GratefulSceneImpl = () => {
  const [imageSrc, setImageSrc] = useState('https://d13wrvtzk1buxr.cloudfront.net/360_images/grateful.jpg');

  const handleImageChange = (e) => {
    setImageSrc(e.target.value);
  };

  return (
    <Entity>
      <a-scene>
        <a-sky src={imageSrc} rotation="0 -100 0" crossorigin="anonymous"></a-sky>
        <a-text font="Oswald" value="GRATEFUL DAI" width="1.5" position="0.1 2 -2" rotation="0 -30 0"></a-text>
      </a-scene>
      <input type="text" onChange={handleImageChange} value={imageSrc}/>
    </Entity>
  );
};

export default GratefulSceneImpl;
