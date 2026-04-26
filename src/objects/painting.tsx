import { useRef, useEffect, useState } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export type { PopupInfo } from "./Focusable";

import type { PopupInfo } from "./Focusable";

interface Props {
  position?: [number, number, number];
  rotation?: [number, number, number];
  size?: { width: number; height: number };
  imageUrl: string;
  withSpotlight?: boolean;
  withFrame?: boolean;
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
  withSpotlight = true,
  withFrame = true,
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
  const texture = useTexture(imageUrl);
  const focusedRef = useRef(false);
  const [hovered, setHovered] = useState(false);

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
    if (distance < 2) {
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
      onPointerEnter={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerLeave={() => { setHovered(false); document.body.style.cursor = "auto"; }}
      onClick={onInfoClick ? (e) => { e.stopPropagation(); onInfoClick(); } : undefined}
    >
      {withFrame && (
        <mesh position={[0, 0, -0.012]}>
          <planeGeometry
            args={[
              size.width + frameThickness * 2,
              size.height + frameThickness * 2,
            ]}
          />
          <meshStandardMaterial color={hovered ? "#c8a96e" : "#111111"} roughness={0.5} />
        </mesh>
      )}

      <mesh castShadow>
        <planeGeometry args={[size.width, size.height]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      <mesh ref={targetRef} position={[0, 0, 0]} />

      {withSpotlight && (
        <mesh position={[0, 3.4, 1.5]}>
          <cylinderGeometry args={[0.04, 0.06, 0.28, 8]} />
          <meshStandardMaterial color="#555555" roughness={0.3} metalness={0.7} />
        </mesh>
      )}

      {withSpotlight && (
        <spotLight
          ref={lightRef}
          position={[0, 3.3, 1.6]}
          angle={0.35}
          penumbra={0.4}
          intensity={120}
          distance={12}
          decay={1.5}
        />
      )}
    </group>
  );
}
