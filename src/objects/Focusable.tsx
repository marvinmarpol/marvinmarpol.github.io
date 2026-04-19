import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export interface PopupInfo {
  title?: string;
  subtitle?: string;
  content?: React.ReactNode;
}

interface Props {
  children: React.ReactNode;
  info: PopupInfo;
  distance?: number;
  onFocus: (info: PopupInfo) => void;
  onBlur: () => void;
}

const _pos = new THREE.Vector3();
const _toObj = new THREE.Vector3();
const _camDir = new THREE.Vector3();

export default function Focusable({
  children,
  info,
  distance = 4,
  onFocus,
  onBlur,
}: Props) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const focusedRef = useRef(false);

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.getWorldPosition(_pos);
    const dist = camera.position.distanceTo(_pos);

    let shouldFocus = false;
    if (dist < distance) {
      _toObj.copy(_pos).sub(camera.position).normalize();
      camera.getWorldDirection(_camDir);
      shouldFocus = _toObj.dot(_camDir) > 0.75;
    }

    if (shouldFocus !== focusedRef.current) {
      focusedRef.current = shouldFocus;
      if (shouldFocus) onFocus(info);
      else onBlur();
    }
  });

  return <group ref={groupRef}>{children}</group>;
}
