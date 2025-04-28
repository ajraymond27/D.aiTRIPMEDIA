import dynamic from 'next/dynamic';

const WatercolorWildflowerScene = dynamic(() => import('./WatercolorWildflowerSceneImpl'), {
  ssr: false
});

export default WatercolorWildflowerScene;
