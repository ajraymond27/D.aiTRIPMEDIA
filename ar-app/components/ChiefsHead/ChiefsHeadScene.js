import dynamic from 'next/dynamic';

const ChiefsHeadScene = dynamic(() => import('./ChiefsHeadSceneImpl'), {
  ssr: false
});

export default ChiefsHeadScene;
