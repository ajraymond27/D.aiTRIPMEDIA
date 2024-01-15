import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Scene component
const Home = dynamic(() => import('./HomeImpl'), { ssr: false });

const HomeScene = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default HomeScene;