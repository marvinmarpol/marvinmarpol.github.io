interface Props {
  position?: any;
  radius?: number;
  intensity?: number;
  distance?: number;
  color?: any;
}

export default function LightBulb({
  position = [0, 0, 0],
  radius = 1,
  intensity = 1,
  distance = 1,
  color = "#ffffff",
}: Props) {
  return (
    <>
      <pointLight position={position} intensity={intensity} color={color} distance={distance} />
      <mesh position={[position[0], position[1] - radius / 2 + 1, position[2]]}>
        <sphereGeometry args={[radius]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
}
