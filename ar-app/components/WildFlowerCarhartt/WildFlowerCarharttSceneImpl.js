import 'aframe';
import {Entity} from 'aframe-react';
import {useState} from 'react';

const WildFlowerCarharttSceneImpl = () => {
  const [imageSrc, setImageSrc] = useState('https://d13wrvtzk1buxr.cloudfront.net/360_images/flower_carhartt.jpg');

  const handleImageChange = (e) => {
    setImageSrc(e.target.value);
  };

  return (
    <Entity>
      <a-scene>
        <a-sky src={imageSrc} rotation="0 -100 0" crossorigin="anonymous"></a-sky>

        {/* Add entity for the HOME text */}
        <a-entity
          position="-2 1 -3"  // Adjust position as needed
          rotation="0 0 0"     // Adjust rotation as needed
          text="value: HOME; align: center; wrapCount: 20; color: white; font: https://cdn.aframe.io/fonts/Exo2Bold.fnt; width: 4"
          link="href: www.daitripmedia.com"       // Link to your homepage
        ></a-entity>
      </a-scene>
      <input type="text" onChange={handleImageChange} value={imageSrc}/>
    </Entity>
  );
};

export default WildFlowerCarharttSceneImpl;
