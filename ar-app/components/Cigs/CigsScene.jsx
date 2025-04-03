import dynamic from 'next/dynamic';

const CigsScene = dynamic(() => import('./CigsSceneImpl'), {
  ssr: false
});

export default CigsScene;
