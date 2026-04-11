export default function Floor({
  position,
  color = "fff",
  size = [1, 1],
  receiveShadow = false,
}) {
  return (
    <mesh
      rotation-x={-Math.PI / 2}
      position={position}
      receiveShadow={receiveShadow}
    >
      <planeGeometry args={size as any} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
