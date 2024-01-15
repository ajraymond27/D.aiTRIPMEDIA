import dynamic from 'next/dynamic';

const WildFlowerCarharttScene = dynamic(() => import('./WildFlowerCarharttSceneImpl'), {
  ssr: false
});

export default WildFlowerCarharttScene;
