import { useRef, useEffect } from "react";
import { useTexture } from "@react-three/drei";

interface Props {
  position?: [number, number, number];
  rotation?: [number, number, number];
  size?: { width: number; height: number };
  imageUrl: string;
  withSpotlight?: boolean;
  withFrame?: boolean;
}

export default function Painting({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = { width: 1, height: 1 },
  imageUrl,
  withSpotlight = true,
  withFrame = true,
}: Props) {
  const lightRef = useRef<any>(null);
  const targetRef = useRef<any>(null);
  const frameThickness = 0.06;
  const texture = useTexture(imageUrl);

  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;
    }
  }, []);

  return (
    <group position={position} rotation={rotation}>
      {/* Frame backing */}
      {withFrame && (
        <mesh position={[0, 0, -0.012]}>
          <planeGeometry
            args={[
              size.width + frameThickness * 2,
              size.height + frameThickness * 2,
            ]}
          />
          <meshStandardMaterial color="#111111" roughness={0.5} />
        </mesh>
      )}

      {/* Painting canvas */}
      <mesh castShadow>
        <planeGeometry args={[size.width, size.height]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Spotlight target (painting center) */}
      <mesh ref={targetRef} position={[0, 0, 0]} />

      {/* Track light fixture cylinder */}
      {withSpotlight && (
        <mesh position={[0, 3.4, 1.5]}>
          <cylinderGeometry args={[0.04, 0.06, 0.28, 8]} />
          <meshStandardMaterial color="#555555" roughness={0.3} metalness={0.7} />
        </mesh>
      )}

      {/* Spotlight from ceiling toward painting */}
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
