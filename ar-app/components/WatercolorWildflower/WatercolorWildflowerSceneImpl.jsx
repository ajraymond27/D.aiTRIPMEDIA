import 'aframe';
import {Entity} from 'aframe-react';
import {useState} from 'react';

const WatercolorWildflowerSceneImpl = () => {
  const [imageSrc, setImageSrc] = useState('https://dzca54yadzmkj.cloudfront.net/360_images/watercolor_wildflower.png');

  const handleImageChange = (e) => {
    setImageSrc(e.target.value);
  };

  return (
    <Entity>
      <a-scene>
        <a-sky src={imageSrc} rotation="0 -45 0"></a-sky>
      </a-scene>
    </Entity>
  );
};

export default WatercolorWildflowerSceneImpl;
