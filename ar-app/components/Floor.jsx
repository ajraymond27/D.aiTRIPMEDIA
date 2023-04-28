import React from "react";

function Floor(props) {
  return (
    <mesh {...props} recieveshadow="true">
      <boxBufferGeometry args={[50,1,50]} />
      <meshPhysicalMaterial color='#404040' />
    </mesh>
  );
}

export default Floor;