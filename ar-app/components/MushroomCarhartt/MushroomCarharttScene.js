import dynamic from 'next/dynamic';

const MushroomCarharttScene = dynamic(() => import('./MushroomCarharttSceneImpl'), {
  ssr: false
});

export default MushroomCarharttScene;
