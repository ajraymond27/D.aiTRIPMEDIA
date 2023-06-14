import 'aframe';
import {Entity} from 'aframe-react';
import {useState} from 'react';

const ChiefsHeadSceneImpl = () => {
  const [imageSrc, setImageSrc] = useState('https://d13wrvtzk1buxr.cloudfront.net/360_images/chief.jpg');
  // const [imageSrc, setImageSrc] = useState('chief.jpg');

  const handleImageChange = (e) => {
    setImageSrc(e.target.value);
  };

  return (
    <Entity>
      <a-scene>
        <a-sky src={imageSrc} rotation="0 -100 0"></a-sky>
        <a-text font="exo2bold" value="Rocky Mountain National Park" width="1.5" position="0.1 2.15 -2" rotation="0 0 0"></a-text>
      </a-scene>
      <input type="text" onChange={handleImageChange} value={imageSrc}/>
    </Entity>
  );
};

export default ChiefsHeadSceneImpl;
