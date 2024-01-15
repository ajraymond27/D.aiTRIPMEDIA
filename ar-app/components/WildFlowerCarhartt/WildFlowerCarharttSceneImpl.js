import 'aframe';
import {Entity} from 'aframe-react';
import {useState} from 'react';

const WildFlowerCarharttSceneImpl = () => {
  const [imageSrc, setImageSrc] = useState('https://d13wrvtzk1buxr.cloudfront.net/360_images/WildFlowerCarhartt.jpg');

  const handleImageChange = (e) => {
    setImageSrc(e.target.value);
  };

  return (
    <Entity>
      <a-scene>
        <a-sky src={imageSrc} rotation="0 -100 0" crossorigin="anonymous"></a-sky>
      </a-scene>
      <input type="text" onChange={handleImageChange} value={imageSrc}/>
    </Entity>
  );
};

export default WildFlowerCarharttSceneImpl;
