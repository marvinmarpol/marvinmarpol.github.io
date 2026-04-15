import { Canvas } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";

import FPSCamera from "../cameras/FPSCamera";
import Floor from "../objects/floor";
import Box from "../objects/box";
import Room from "../objects/room";
import LightBulb from "../lighting/LightBulb";
import Painting from "../objects/painting";

interface Props {
  width?: number;
  height?: number;
  depth?: number;
}

export default function Museum({ width = 10, height = 10, depth = 10 }: Props) {
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
          color={"#050505"}
          /* tileTexture={{
            path: "./textures/wood.jpeg",
            repeatX: 32,
            repeatY: 32,
          }} */
        />
        <Room
          position={[floorPosition.x, floorPosition.y, floorPosition.z]}
          size={{ width, height, depth }}
          color="#f0f0f0"
        />

        <Box position={[2, 2, 2]} />
        <Painting
          imageUrl={"./paintings/summer.jpeg"}
          position={[0, 2, -height / 2 + 0.01]}
        />
      </>
    );
  };

  return (
    <div id="canvas-container">
      <Canvas gl={{ toneMappingExposure: 2.5 }}>
        <ambientLight intensity={0.2} />

        {/* <LightBulb
          intensity={21}
          position={[0, depth / 2 - 1, height / 3]}
          radius={0.1}
          distance={21}
          color={"#f0f0f0"}
        /> */}

        <LightBulb
          intensity={34}
          position={[0, depth / 2 - 1, 0]}
          radius={0.1}
          distance={21}
          color={"#f0f0f0"}
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
