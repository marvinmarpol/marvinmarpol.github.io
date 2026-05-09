import { useRef, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import type { PopupInfo } from "./Focusable";

interface Props {
  position?: [number, number, number];
  rotation?: [number, number, number];
  size?: { width: number; height: number };
  imageUrl: string;
  withSpotlight?: boolean;
  renderSpotlight?: boolean;
  withFrame?: boolean;
  frameColor?: string;
  info?: PopupInfo;
  onFocus?: (info: PopupInfo) => void;
  onBlur?: () => void;
  onInfoClick?: () => void;
}

const _paintingPos = new THREE.Vector3();
const _toP = new THREE.Vector3();
const _camDir = new THREE.Vector3();

export default function Painting({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = { width: 1, height: 1 },
  imageUrl,
  withSpotlight = false,
  renderSpotlight = false,
  withFrame = true,
  frameColor = "#111111",
  info,
  onFocus,
  onBlur,
  onInfoClick,
}: Props) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<any>(null);
  const targetRef = useRef<any>(null);
  const frameThickness = 0.06;
  const frameDepth = 0.06;
  const texture = useTexture(imageUrl);
  const focusedRef = useRef(false);

  useEffect(() => {
    const img = texture.image as HTMLImageElement | undefined;
    if (!img?.width || !img?.height) return;
    const imgAspect = img.width / img.height;
    const meshAspect = size.width / size.height;
    if (imgAspect > meshAspect) {
      texture.repeat.set(meshAspect / imgAspect, 1);
      texture.offset.set((1 - texture.repeat.x) / 2, 0);
    } else {
      texture.repeat.set(1, imgAspect / meshAspect);
      texture.offset.set(0, (1 - texture.repeat.y) / 2);
    }
    texture.needsUpdate = true;
  }, [texture, size.width, size.height]);

  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;
    }
  }, []);

  useFrame(() => {
    if (!groupRef.current || !info) return;

    groupRef.current.getWorldPosition(_paintingPos);
    const distance = camera.position.distanceTo(_paintingPos);

    let shouldFocus = false;
    if (distance < 3) {
      _toP.copy(_paintingPos).sub(camera.position).normalize();
      camera.getWorldDirection(_camDir);
      shouldFocus = _toP.dot(_camDir) > 0.55;
    }

    if (shouldFocus !== focusedRef.current) {
      focusedRef.current = shouldFocus;
      if (shouldFocus) onFocus?.(info);
      else onBlur?.();
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerEnter={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        document.body.style.cursor = "auto";
      }}
      onClick={
        onInfoClick
          ? (e) => {
              e.stopPropagation();
              onInfoClick();
            }
          : undefined
      }
    >
      {withFrame && (
        <mesh position={[0, 0, -frameDepth / 2]}>
          <boxGeometry
            args={[
              size.width + frameThickness * 2,
              size.height + frameThickness * 2,
              frameDepth,
            ]}
          />
          <meshStandardMaterial
            color={focusedRef.current ? "#d0e60d" : frameColor}
            roughness={0.55}
            metalness={0.1}
          />
        </mesh>
      )}

      {/* Canvas covers the front face of the frame box */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[size.width, size.height]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      <mesh ref={targetRef} position={[0, 0, 0]} />

      {withSpotlight && renderSpotlight && (
        <mesh position={[0, 3, 2.5]} rotation={[Math.PI / 4, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.28, 8]} />
          <meshStandardMaterial
            color="#555555"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      )}

      {withSpotlight && (
        <spotLight
          ref={lightRef}
          position={[0, 3.3, 2.6]}
          angle={0.35}
          penumbra={0.4}
          intensity={55}
          distance={12}
          decay={1.5}
        />
      )}
    </group>
  );
}
