import { Canvas, useFrame } from "@react-three/fiber";
import Box from "../objects/box";

import { OrbitControls, PointerLockControls, Stats } from "@react-three/drei";
import Floor from "../objects/floor";

export default function Museum({ width = 10, height = 10, depth = 10 }) {
  const cameraPosition = {
    x: 0,
    y: 1.78,
    z: 5,
  };

  return (
    <div id="canvas-container">
      <Canvas
        camera={{
          position: [cameraPosition.x, cameraPosition.y, cameraPosition.z],
        }}
      >
        <ambientLight />
        <Floor
          position={[0, 0, 0]}
          size={[width, height]}
          receiveShadow={true}
        />
        <gridHelper />
      </Canvas>
    </div>
  );
}
