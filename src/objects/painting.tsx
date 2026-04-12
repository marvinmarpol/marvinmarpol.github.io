interface Props {
  position?: any;
  rotation?: { x?: number; y?: number; z?: number };
  size?: [width?: number, height?: number];
  color?: any;
  children?: React.ReactNode;
}

export default function Floor({
  position = [0, 0, 0],
  rotation = { x: 0, y: 0, z: 0 },
  size = [1, 1],
  color = "#ffffff",
  children,
}: Props) {
  return (
    <mesh
      rotation-x={rotation.x}
      rotation-y={rotation.y}
      rotation-z={rotation.z}
      position={position}
    >
      <planeGeometry args={size} />
      <meshBasicMaterial color={color} />
      {children}
    </mesh>
  );
}
