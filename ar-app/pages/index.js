import { Canvas } from "@react-three/fiber";
import css from "../styles/Home.module.css";
import LightBulb from "../components/LightBulb";
import OrbitControls from "../components/OrbitControls";
import Draggable from "../components/Draggable";
import Floor from "../components/Floor";
import Box from "../components/Box";
import {Suspense} from "react";
import { Plane } from "three";


export default function Home() {
  return (
    <div className={css.scene}>
      <Canvas
        shadows={true}
        className={css.canvas}
        camera={{
          position: [-6, 7, 7],
        }}
      >
          <ambientLight color={"white"} intensity={0.2} />
          <LightBulb position={[0, 3, 0]} />
            <Suspense fallback={null}>
                <Box rotateX={3} rotateY={0.2} />
            </Suspense>
          <OrbitControls/>

          
          <Floor position={[0, -1, 0]} />
      </Canvas>
    </div>
  );
}

