import dynamic from 'next/dynamic';

const MoabImpl = dynamic(() => import('./MoabImpl'), {
  ssr: false
});

export default MoabImpl;