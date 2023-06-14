import dynamic from 'next/dynamic';

const TetonScene = dynamic(() => import('./TetonSceneImpl'), {
  ssr: false
});

export default TetonScene;
