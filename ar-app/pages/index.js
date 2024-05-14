import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import css from '../styles/Home.module.css';
import LightBulb from '../components/LightBulb';
import OrbitControls from '../components/OrbitControls';
import Floor from '../components/Floor';
import { Text } from '@react-three/drei';

export default function Home() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set the date and time of the event you're counting down to
    const countdownDate = new Date('2023-06-01T00:00:00Z').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      // Calculate days, hours, minutes, and seconds left until countdownDate
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update the countdown state with the new values
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={css.scene}>
      <Canvas
        shadows={true}
        className={css.canvas}
        camera={{
          position: [0, 0, 10],
        }}
      >
        <ambientLight color={'white'} intensity={0.2} />
        <LightBulb position={[0, 7, 0]} />
        <OrbitControls />
        <Floor position={[0, -1, 0]} />
      </Canvas>
    </div>
  );
}
