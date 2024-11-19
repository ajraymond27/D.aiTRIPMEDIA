import { Canvas } from '@react-three/fiber';
import css from '../styles/Home.module.css';
import LightBulb from '../components/LightBulb';
import OrbitControls from '../components/OrbitControls';
import Floor from '../components/Floor';

export default function Home() {
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
