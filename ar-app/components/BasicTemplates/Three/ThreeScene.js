import dynamic from 'next/dynamic';

const ThreeScene = dynamic(() => import('./ThreeSceneImpl'), {
  ssr: false
});

export default ThreeScene;
