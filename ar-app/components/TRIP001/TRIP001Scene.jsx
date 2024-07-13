import dynamic from 'next/dynamic';

const TRIP001Scene = dynamic(() => import('./TRIP001SceneImpl'), {
  ssr: false
});

export default TRIP001Scene;
