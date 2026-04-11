import { Canvas } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";

import FPSCamera from "../cameras/FPSCamera";
import Floor from "../objects/floor";
import Box from "../objects/box";
import Room from "../objects/room";
import LightBulb from "../lighting/LightBulb";

interface Props {
  width?: number;
  height?: number;
  depth?: number;
}

export default function Museum({ width = 20, height = 36, depth = 12 }: Props) {
  const cameraPosition = {
    x: 0,
    y: 1.78,
    z: height / 2,
  };

  const floorPosition = {
    x: 0,
    y: 0,
    z: 0,
  };

  const Scene = () => {
    return (
      <>
        <Floor
          position={[floorPosition.x, floorPosition.y, floorPosition.z]}
          size={[width, height]}
          receiveShadow={true}
        />
        <Room
          position={[floorPosition.x, floorPosition.y, floorPosition.z]}
          size={{ width, height, depth }}
          color="#f4f1eb"
        />

        <Box />
      </>
    );
  };

  return (
    <div id="canvas-container">
      <Canvas>
        {/* Soft global light */}
        <ambientLight intensity={0.3} />

        {/* Main gallery spotlight */}
        <directionalLight
          position={[0, 15, -width]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />

        <LightBulb
          intensity={13}
          position={[0, depth / 2 - 1, 0]}
          radius={0.1}
        />

        <Scene />

        <FPSCamera
          width={width}
          height={height}
          position={{
            x: cameraPosition.x,
            y: cameraPosition.y,
            z: cameraPosition.z,
          }}
          clampOffset={{
            x: floorPosition.x,
            y: floorPosition.y,
            z: floorPosition.z,
          }}
        />
        <PointerLockControls />
      </Canvas>
    </div>
  );
}
