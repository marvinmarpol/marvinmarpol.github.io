import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";
import * as THREE from "three";

export default function Box(props: any) {
  const ref = useRef<Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [rotate, setRotate] = useState(false);
  const texture = useLoader(THREE.TextureLoader, "./textures/wood.jpeg");
  const material = new THREE.MeshBasicMaterial();
  material.map = texture;

  useFrame((_, delta) => {
    if (!ref.current) {
      return;
    }

    if (rotate) {
      ref.current.rotation.x += 1 * delta;
      ref.current.rotation.y += 0.5 * delta;
    }
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      onPointerDown={() => setRotate(!rotate)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      material={material}
    >
      <boxGeometry />
    </mesh>
  );
}
