import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Painting({ position = [0, 2, -10], imageUrl }) {
  const lightRef = useRef<any>(null);
  const targetRef = useRef<any>(null);

  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;
    }
  }, []);

  return (
    <group position={[position[0], position[1], position[2]]}>
      {/* Painting */}
      <mesh castShadow>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial map={new THREE.TextureLoader().load(imageUrl)} />
      </mesh>

      <mesh position={[1.51, 0, 0]}>
        <boxGeometry args={[0.05, 2, 0.05]} />
        <meshBasicMaterial color={"black"} />
      </mesh>

      <mesh position={[-1.51, 0, 0]}>
        <boxGeometry args={[0.05, 2, 0.05]} />
        <meshBasicMaterial color={"black"} />
      </mesh>

      {/* Invisible target (center of painting) */}
      <mesh ref={targetRef} position={[0, 0, 0]} />

      {/* Spotlight at 45° */}
      <spotLight
        ref={lightRef}
        position={[0, 3, 8]} // ← THIS creates the 45° angle
        angle={0.3}
        penumbra={0.5}
        intensity={34}
        distance={10}
        decay={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
    </group>
  );
}
