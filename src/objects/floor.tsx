interface Props {
  position?: any;
  size?: [width?: number, height?: number];
  color?: any;
  receiveShadow?: boolean;
}

export default function Floor({
  position = [0, 0, 0],
  size = [1, 1],
  color = "#ffffff",
  receiveShadow = false,
}: Props) {
  return (
    <mesh
      rotation-x={-Math.PI / 2}
      position={position}
      receiveShadow={receiveShadow}
    >
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.5} />
    </mesh>
  );
}
