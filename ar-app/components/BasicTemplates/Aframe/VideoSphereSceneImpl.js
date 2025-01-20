// components/VideoSceneImplementation.jsx
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically load the VideoScene component to ensure A-Frame is only loaded client-side
const VideoScene = dynamic(() => import('./VideoSphereScene'), { ssr: false });

const VideoSceneImplementation = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <VideoScene />
    </div>
  );
};

export default VideoSceneImplementation;
