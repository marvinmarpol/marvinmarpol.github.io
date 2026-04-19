import { useState, useCallback, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import FPSCamera from "../cameras/FPSCamera";
import Floor from "../objects/floor";
import Room from "../objects/room";
import Painting from "../objects/painting";
import LightBulb from "../lighting/LightBulb";
import { type PopupInfo } from "../objects/Focusable";

const PAINTING_WIDTH = 1.2;
const PAINTING_HEIGHT = 1.6;
const PAINTING_Y = 2.6;

const NS_COUNT = 4;
const NS_SPACING = 5;
const NS_START_X = -((NS_COUNT - 1) * NS_SPACING) / 2;

const EW_COUNT = 3;
const EW_SPACING = 4;
const EW_START_Z = -((EW_COUNT - 1) * EW_SPACING) / 2;

const NORTH_INFOS: PopupInfo[] = [
  {
    title: "Summer Solstice",
    subtitle: "M. Mitchell · 2024",
    content: 
    <>
    <p>The warmth of the longest day captured in light and color.</p>
    </>
  },
  {
    title: "Golden Hour",
    subtitle: "M. Mitchell · 2024",
    content: <p>A fleeting moment between afternoon and evening.</p>,
  },
  {
    title: "Still Waters",
    subtitle: "M. Mitchell · 2023",
    content: <p>Reflection on a calm lake at dusk.</p>,
  },
  {
    title: "Open Field",
    subtitle: "M. Mitchell · 2023",
    content: <p>Vast expanses of grain under a pale sky.</p>,
  },
];

const SIDE_INFOS: PopupInfo[] = [
  {
    title: "Threshold",
    subtitle: "M. Mitchell · 2022",
    content: <p>Standing at the edge of something new.</p>,
  },
  {
    title: "Silence",
    subtitle: "M. Mitchell · 2021",
    content: <p>The quiet before the storm arrives.</p>,
  },
  {
    title: "Resonance",
    subtitle: "M. Mitchell · 2020",
    content: <p>Sound made visible through shape and hue.</p>,
  },
];

interface SceneProps {
  width: number;
  height: number;
  depth: number;
  onFocus: (info: PopupInfo) => void;
  onBlur: () => void;
}

function Scene({ width, height, depth, onFocus, onBlur }: SceneProps) {
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
      <Room position={[0, 0, 0]} size={{ width, height, depth }} color="#888888" />

      {/* North wall */}
      {Array.from({ length: NS_COUNT }, (_, i) => (
        <Painting
          key={`north-${i}`}
          imageUrl={"./paintings/summer.jpeg"}
          position={[NS_START_X + i * NS_SPACING, PAINTING_Y, -height / 2 + 0.02]}
          size={{ width: PAINTING_WIDTH, height: PAINTING_HEIGHT }}
          info={NORTH_INFOS[i]}
          onFocus={onFocus}
          onBlur={onBlur}
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
          info={SIDE_INFOS[i]}
          onFocus={onFocus}
          onBlur={onBlur}
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
          info={SIDE_INFOS[i]}
          onFocus={onFocus}
          onBlur={onBlur}
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

  const [activeInfo, setActiveInfo] = useState<PopupInfo | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const activeInfoRef = useRef<PopupInfo | null>(null);

  const handleFocus = useCallback((info: PopupInfo) => {
    activeInfoRef.current = info;
    setActiveInfo(info);
  }, []);

  const handleBlur = useCallback(() => {
    activeInfoRef.current = null;
    setActiveInfo(null);
    setShowPopup(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "KeyX" && activeInfoRef.current) setShowPopup((v) => !v);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div id="canvas-container">
      {showPopup && activeInfo && (
        <div style={{
          position: "fixed",
          bottom: "40px",
          left: "40px",
          background: "rgba(8, 8, 8, 0.85)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "6px",
          padding: "16px 20px",
          color: "#f0f0f0",
          fontFamily: "Georgia, serif",
          maxWidth: "300px",
          zIndex: 10,
        }}>
          {activeInfo.title && (
            <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "4px" }}>
              {activeInfo.title}
            </div>
          )}
          {activeInfo.subtitle && (
            <div style={{ fontSize: "12px", color: "#888", marginBottom: "10px" }}>
              {activeInfo.subtitle}
            </div>
          )}
          {activeInfo.content && (
            <div style={{ fontSize: "13px", color: "#bbb", lineHeight: "1.6" }}>
              {activeInfo.content}
            </div>
          )}
        </div>
      )}

      {activeInfo && !showPopup && (
        <div style={{
          position: "fixed",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.5)",
          fontFamily: "sans-serif",
          fontSize: "13px",
          pointerEvents: "none",
          zIndex: 10,
        }}>
          Press <strong>X</strong> to view info
        </div>
      )}

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

        <Scene width={width} height={height} depth={depth} onFocus={handleFocus} onBlur={handleBlur} />

        <EffectComposer>
          <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.4} intensity={0.6} />
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
