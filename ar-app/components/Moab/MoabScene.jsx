import dynamic from 'next/dynamic';

const AFrameScene = dynamic(() => import('./MoabImpl'), { ssr: false });

export default function AFrameScenePage() {
  return <AFrameScene />;
}
