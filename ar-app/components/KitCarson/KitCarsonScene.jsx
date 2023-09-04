import dynamic from 'next/dynamic';

const KitCarsonScene = dynamic(() => import('./KitCarsonSceneImpl'), {
  ssr: false
});

export default KitCarsonScene;
