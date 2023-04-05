import dynamic from 'next/dynamic';

const AFrameScene = dynamic(() => import('./AFrameSceneImpl'), {
  ssr: false
});

export default AFrameScene;
