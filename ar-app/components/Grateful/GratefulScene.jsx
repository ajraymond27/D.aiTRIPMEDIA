import dynamic from 'next/dynamic';

const GratefulScene = dynamic(() => import('./GratefulSceneImpl'), {
  ssr: false
});

export default GratefulScene;
