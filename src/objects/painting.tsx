import { useRef, useEffect } from "react";
import * as THREE from "three";

interface Props {
  position?: any;
  size?: { width: number; height: number };
  imageUrl: string;
  withSpotlight?: boolean;
  withFrame?: boolean;
}

export default function Painting({
  position = [0, 0, 0],
  size = { width: 1, height: 1 },
  imageUrl,
  withSpotlight = true,
  withFrame = true,
}: Props) {
  const lightRef = useRef<any>(null);
  const targetRef = useRef<any>(null);
  const frameThickness = 0.1;

  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;
    }
  }, []);

  return (
    <group position={[position[0], position[1], position[2]]}>
      {/* Painting */}
      <mesh castShadow>
        <planeGeometry args={[size.width, size.height]} />
        <meshStandardMaterial map={new THREE.TextureLoader().load(imageUrl)} />
      </mesh>

      {/* Frame */}
      {withFrame && <></>}

      {/* Invisible target (center of painting) */}
      <mesh ref={targetRef} position={[0, 0, 0]} />

      {/* Spotlight */}
      {withSpotlight && (
        <spotLight
          ref={lightRef}
          position={[0, 3, 8]}
          angle={0.3}
          penumbra={1}
          intensity={144}
          distance={10}
          decay={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
      )}
    </group>
  );
}
