import 'aframe';
import {Entity} from 'aframe-react';
import {useState} from 'react';

const GratefulSceneImpl = () => {
  const [imageSrc, setImageSrc] = useState('https://dzca54yadzmkj.cloudfront.net/360_images/grateful.jpg');

  const handleImageChange = (e) => {
    setImageSrc(e.target.value);
  };

  return (
    <Entity>
      <a-scene>
        <a-sky src={imageSrc} rotation="0 80 0" crossorigin="anonymous"></a-sky>
      </a-scene>
      <input type="text" onChange={handleImageChange} value={imageSrc}/>
    </Entity>
  );
};

export default GratefulSceneImpl;
