import { useState, useCallback, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import {
  PointerLockControls,
  OrbitControls,
  useProgress,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import FPSCamera from "../../cameras/FPSCamera";
import Room from "../../objects/room";
import Floor from "../../objects/floor";
import Painting from "../../objects/painting";
import LightBulb from "../../lighting/LightBulb";
import EntryOverlay from "../../overlay/EntryOverlay";
import useIsMobile from "../../hooks/useIsMobile";
import { type PopupInfo } from "../../objects/Focusable";
import {
  EAST_INFOS,
  EAST_TEXTURES,
  NORTH_INFOS,
  NORTH_TEXTURES,
  WallLabel,
  WEST_INFOS,
  WEST_TEXTURES,
} from "./info";

const PAINTING_WIDTH = 1.2;
const PAINTING_HEIGHT = 1.6;
const PAINTING_Y = 2.6;

const NS_PAINTING_WIDTH = 2.0;
const NS_PAINTING_HEIGHT = 1.13; // ~16:9 to match landscape company banners

const NS_COUNT = 5;
const NS_SPACING = 5;
const NS_START_X = -((NS_COUNT - 1) * NS_SPACING) / 2;

const EW_COUNT = 3;
const EW_SPACING = 5;
const EW_START_Z = -((EW_COUNT - 1) * EW_SPACING) / 2;

const MY_HEIGHT = 1.78;

const _defaultOrbitTarget = new Vector3(0, MY_HEIGHT, 0);

function MobilePanController({
  orbitRef,
  panTarget,
}: {
  orbitRef: { current: any };
  panTarget: Vector3 | null;
}) {
  useFrame(() => {
    const controls = orbitRef.current;
    if (!controls) return;
    const target = panTarget ?? _defaultOrbitTarget;
    if (controls.target.distanceToSquared(target) < 0.00001) return;
    if (panTarget) controls.object.position.sub(panTarget).normalize();
    controls.target.lerp(target, 0.07);
    controls.update();
  });
  return null;
}

interface SceneProps {
  width: number;
  height: number;
  depth: number;
  onFocus: (info: PopupInfo) => void;
  onBlur: () => void;
  isMobile: boolean;
  onInfoClick: (info: PopupInfo) => void;
  northInfos: PopupInfo[];
  westInfos: PopupInfo[];
  eastInfos: PopupInfo[];
  started: boolean;
  onMobileSelect?: (pos: Vector3) => void;
}

function Scene({
  width,
  height,
  onFocus,
  onBlur,
  isMobile,
  onInfoClick,
  northInfos,
  westInfos,
  eastInfos,
  started,
  onMobileSelect,
}: SceneProps) {
  return (
    <>
      <Floor
        position={[0, 0, 0]}
        size={[width, height]}
        receiveShadow={true}
        color={"#aaaaaa"}
      />
      <Room
        position={[0, 0, 0]}
        size={{ width, height, depth: 12 }}
        color="#888888"
      />

      {/* North wall — Work Experience */}
      {Array.from({ length: NS_COUNT }, (_, i) => (
        <Painting
          key={`north-${i}`}
          imageUrl={NORTH_TEXTURES[i]}
          frameColor="#1a1a2e"
          position={[
            NS_START_X + i * NS_SPACING,
            PAINTING_Y,
            -height / 2 + 0.02,
          ]}
          size={{ width: NS_PAINTING_WIDTH, height: NS_PAINTING_HEIGHT }}
          info={northInfos[i]}
          onFocus={onFocus}
          onBlur={onBlur}
          onInfoClick={
            isMobile
              ? () => {
                  onInfoClick(northInfos[i]);
                  onMobileSelect?.(
                    new Vector3(
                      NS_START_X + i * NS_SPACING,
                      PAINTING_Y,
                      -height / 2 + 0.02,
                    ),
                  );
                }
              : undefined
          }
          withSpotlight
          withFrame
        />
      ))}
      {started && (
        <group position={[0, 4.2, -height / 2 + 0.05]}>
          <WallLabel>Work Experience</WallLabel>
        </group>
      )}

      {/* West wall — Achievements */}
      {Array.from({ length: EW_COUNT }, (_, i) => (
        <Painting
          key={`west-${i}`}
          imageUrl={WEST_TEXTURES[i]}
          frameColor="#2e1a1a"
          position={[width / 2 - 0.02, PAINTING_Y, EW_START_Z + i * EW_SPACING]}
          rotation={[0, -Math.PI / 2, 0]}
          size={{ width: PAINTING_WIDTH, height: PAINTING_HEIGHT }}
          info={westInfos[i]}
          onFocus={onFocus}
          onBlur={onBlur}
          onInfoClick={
            isMobile
              ? () => {
                  onInfoClick(westInfos[i]);
                  onMobileSelect?.(
                    new Vector3(
                      width / 2 - 0.02,
                      PAINTING_Y,
                      EW_START_Z + i * EW_SPACING,
                    ),
                  );
                }
              : undefined
          }
          withSpotlight
          withFrame
        />
      ))}
      {started && (
        <group
          position={[width / 2 - 0.05, 4.2, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          <WallLabel>Achievements</WallLabel>
        </group>
      )}

      {/* East wall — Specializations */}
      {Array.from({ length: EW_COUNT }, (_, i) => (
        <Painting
          key={`east-${i}`}
          imageUrl={EAST_TEXTURES[i]}
          frameColor="#1a2e1a"
          position={[
            -width / 2 + 0.02,
            PAINTING_Y,
            EW_START_Z + i * EW_SPACING,
          ]}
          rotation={[0, Math.PI / 2, 0]}
          size={{ width: PAINTING_WIDTH, height: PAINTING_HEIGHT }}
          info={eastInfos[i]}
          onFocus={onFocus}
          onBlur={onBlur}
          onInfoClick={
            isMobile
              ? () => {
                  onInfoClick(eastInfos[i]);
                  onMobileSelect?.(
                    new Vector3(
                      -width / 2 + 0.02,
                      PAINTING_Y,
                      EW_START_Z + i * EW_SPACING,
                    ),
                  );
                }
              : undefined
          }
          withSpotlight
          withFrame
        />
      ))}
      {started && (
        <group
          position={[-width / 2 + 0.05, 4.2, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <WallLabel>Specializations</WallLabel>
        </group>
      )}
    </>
  );
}

interface Props {
  width?: number;
  height?: number;
  depth?: number;
}

export default function Museum({ width = 22, height = 16, depth = 12 }: Props) {
  const cameraPosition = { x: 0, y: MY_HEIGHT, z: height / 3 };
  const isMobile = useIsMobile();

  const { progress: loadingProgress } = useProgress();
  const [started, setStarted] = useState(false);
  const [activeInfo, setActiveInfo] = useState<PopupInfo | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [panTarget, setPanTarget] = useState<Vector3 | null>(null);
  const activeInfoRef = useRef<PopupInfo | null>(null);
  const pointerLockRef = useRef<any>(null);
  const orbitRef = useRef<any>(null);

  const handleFocus = useCallback((info: PopupInfo) => {
    activeInfoRef.current = info;
    setActiveInfo(info);
    setShowPopup(true);
  }, []);

  const handleBlur = useCallback(() => {
    activeInfoRef.current = null;
    setActiveInfo(null);
    setShowPopup(false);
    setPanTarget(null);
  }, []);

  const handleInfoClick = useCallback((info: PopupInfo) => {
    setActiveInfo(info);
    setShowPopup(true);
  }, []);

  const handlePointerMissed = useCallback(() => {
    if (isMobile) {
      setShowPopup(false);
      setActiveInfo(null);
      setPanTarget(null);
    }
  }, [isMobile]);

  const handleEnter = useCallback(() => {
    setStarted(true);
    if (!isMobile) {
      pointerLockRef.current?.lock();
      document.documentElement.requestFullscreen?.().catch(() => {});
    }
  }, []);

  return (
    <div id="canvas-container">
      {!started && (
        <EntryOverlay onEnter={handleEnter} progress={loadingProgress} />
      )}
      {!isMobile && started && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 16,
              height: 2,
              background: "rgba(255,255,255,0.7)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 2,
              height: 16,
              background: "rgba(255,255,255,0.7)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        </div>
      )}

      {showPopup && activeInfo && (
        <div
          style={{
            position: "fixed",
            bottom: "40px",
            left: "40px",
            background: "rgba(8, 8, 8, 0.92)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderLeft: "3px solid rgba(255,255,255,0.22)",
            borderRadius: "4px",
            padding: "18px 22px",
            color: "#f0f0f0",
            maxWidth: "380px",
            zIndex: 10,
          }}
        >
          {activeInfo.title && (
            <div
              style={{
                fontSize: "15px",
                fontWeight: "600",
                marginBottom: "4px",
                letterSpacing: "0.02em",
              }}
            >
              {activeInfo.title}
            </div>
          )}
          {activeInfo.subtitle && (
            <div
              style={{
                fontSize: "11px",
                color: "#666",
                marginBottom: "12px",
                letterSpacing: "0.04em",
              }}
            >
              {activeInfo.subtitle}
            </div>
          )}
          {activeInfo.content && (
            <div style={{ fontSize: "12px", color: "#bbb", lineHeight: "1.6" }}>
              {activeInfo.content}
            </div>
          )}
        </div>
      )}

      <Canvas
        shadows
        gl={{ toneMappingExposure: 2.2 }}
        camera={{ fov: 75 }}
        onPointerMissed={handlePointerMissed}
      >
        <fog attach="fog" args={["#555555", depth, Math.max(width, height)]} />
        <ambientLight intensity={0.4} />

        <LightBulb
          intensity={34}
          position={[0, depth / 2 - 1, 0]}
          radius={0.1}
          distance={21}
          color={"#f0f0f0"}
        />

        <Scene
          width={width}
          height={height}
          depth={depth}
          onFocus={handleFocus}
          onBlur={handleBlur}
          isMobile={isMobile}
          onInfoClick={handleInfoClick}
          northInfos={NORTH_INFOS}
          westInfos={WEST_INFOS}
          eastInfos={EAST_INFOS}
          started={started}
          onMobileSelect={isMobile ? setPanTarget : undefined}
        />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.6}
            luminanceSmoothing={0.4}
            intensity={0.6}
          />
        </EffectComposer>

        {isMobile ? (
          <>
            <OrbitControls
              ref={orbitRef}
              target={[0, cameraPosition.y, 0]}
              maxPolarAngle={Math.PI / 2 - 0.1}
              minPolarAngle={Math.PI / 2 - 0.5}
              minDistance={2}
              maxDistance={4}
              enableRotate={!panTarget}
            />
            <MobilePanController orbitRef={orbitRef} panTarget={panTarget} />
          </>
        ) : (
          <>
            <FPSCamera
              width={width}
              height={height}
              position={cameraPosition}
              clampOffset={{ x: 0, y: 0, z: 0 }}
              disabled={!started}
            />
            <PointerLockControls ref={pointerLockRef} />
          </>
        )}
      </Canvas>
    </div>
  );
}
