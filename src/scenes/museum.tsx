import { Canvas } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import FPSCamera from "../cameras/FPSCamera";
import Floor from "../objects/floor";
import Room from "../objects/room";
import Painting from "../objects/painting";
import LightBulb from "../lighting/LightBulb";

const PAINTING_WIDTH = 1.2;
const PAINTING_HEIGHT = 1.6;
const PAINTING_Y = 2.6;

const NS_COUNT = 4;
const NS_SPACING = 5;
const NS_START_X = -((NS_COUNT - 1) * NS_SPACING) / 2;

const EW_COUNT = 3;
const EW_SPACING = 4;
const EW_START_Z = -((EW_COUNT - 1) * EW_SPACING) / 2;

interface SceneProps {
  width: number;
  height: number;
  depth: number;
}

function Scene({ width, height, depth }: SceneProps) {
  return (
    <>
      <Floor
        position={[0, 0, 0]}
        size={[width, height]}
        receiveShadow={true}
        color={"#aaaaaa"}
        /* tileTexture={{
          path: "./textures/wood.jpeg",
          repeatX: 12,
          repeatY: 20,
        }} */
      />
      <Room
        position={[0, 0, 0]}
        size={{ width, height, depth }}
        color="#888888"
      />

      {/* North wall */}
      {Array.from({ length: NS_COUNT }, (_, i) => (
        <Painting
          key={`north-${i}`}
          imageUrl={"./paintings/summer.jpeg"}
          position={[NS_START_X + i * NS_SPACING, PAINTING_Y, -height / 2 + 0.02]}
          size={{ width: PAINTING_WIDTH, height: PAINTING_HEIGHT }}
          withSpotlight
          withFrame
        />
      ))}

      {/* South wall */}
      {Array.from({ length: NS_COUNT }, (_, i) => (
        <Painting
          key={`south-${i}`}
          imageUrl={"./paintings/summer.jpeg"}
          position={[NS_START_X + i * NS_SPACING, PAINTING_Y, height / 2 - 0.02]}
          rotation={[0, Math.PI, 0]}
          size={{ width: PAINTING_WIDTH, height: PAINTING_HEIGHT }}
          withSpotlight
          withFrame
        />
      ))}

      {/* West wall */}
      {Array.from({ length: EW_COUNT }, (_, i) => (
        <Painting
          key={`west-${i}`}
          imageUrl={"./paintings/summer.jpeg"}
          position={[width / 2 - 0.02, PAINTING_Y, EW_START_Z + i * EW_SPACING]}
          rotation={[0, -Math.PI / 2, 0]}
          size={{ width: PAINTING_WIDTH, height: PAINTING_HEIGHT }}
          withSpotlight
          withFrame
        />
      ))}

      {/* East wall */}
      {Array.from({ length: EW_COUNT }, (_, i) => (
        <Painting
          key={`east-${i}`}
          imageUrl={"./paintings/summer.jpeg"}
          position={[-width / 2 + 0.02, PAINTING_Y, EW_START_Z + i * EW_SPACING]}
          rotation={[0, Math.PI / 2, 0]}
          size={{ width: PAINTING_WIDTH, height: PAINTING_HEIGHT }}
          withSpotlight
          withFrame
        />
      ))}
    </>
  );
}

interface Props {
  width?: number;
  height?: number;
  depth?: number;
}

export default function Museum({ width = 22, height = 16, depth = 12 }: Props) {
  const cameraPosition = { x: 0, y: 1.78, z: height / 2 - 0.5 };

  return (
    <div id="canvas-container">
      <Canvas shadows gl={{ toneMappingExposure: 2.2 }} camera={{ fov: 75 }}>
        <fog attach="fog" args={["#555555", 8, 28]} />
        <ambientLight intensity={0.4} />

        <LightBulb
          intensity={34}
          position={[0, depth / 2 - 1, 0]}
          radius={0.1}
          distance={21}
          color={"#f0f0f0"}
        />

        <Scene width={width} height={height} depth={depth} />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.6}
            luminanceSmoothing={0.4}
            intensity={0.6}
          />
        </EffectComposer>

        <FPSCamera
          width={width}
          height={height}
          position={cameraPosition}
          clampOffset={{ x: 0, y: 0, z: 0 }}
        />
        <PointerLockControls />
      </Canvas>
    </div>
  );
}
