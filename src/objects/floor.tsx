import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface Props {
  position?: any;
  size?: [width?: number, height?: number];
  color?: any;
  receiveShadow?: boolean;
  tileTexture?: { path: string; repeatX?: number, repeatY?: number };
}

export default function Floor({
  position = [0, 0, 0],
  size = [1, 1],
  color = "#ffffff",
  receiveShadow = false,
  tileTexture,
}: Props) {
  const texture = tileTexture?.path ? useTexture(tileTexture.path) : null;
  if (texture) {
    const tileX = tileTexture?.repeatX || 1;
    const tileY = tileTexture?.repeatY || 1;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(tileX, tileY);
  }
  return (
    <mesh
      rotation-x={-Math.PI / 2}
      position={position}
      receiveShadow={receiveShadow}
    >
      <planeGeometry args={size} />
      <meshStandardMaterial
        color={color}
        roughness={0.6}
        metalness={0.1}
        map={texture}
      />
    </mesh>
  );
}
