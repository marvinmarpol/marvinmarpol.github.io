interface Props {
  position?: any;
  size?: { width: number; height: number; depth: number };
  color?: string;
  receiveShadow?: boolean;
}

export default function Room({
  position,
  size = { width: 1, height: 1, depth: 1 },
  color = "#ffffff",
  receiveShadow = false,
}: Props) {
  const offset = {
    x: position[0],
    y: position[1],
    z: position[2],
  };

  const wallNorthPosition = [
    position[0],
    position[1],
    -size.height / 2 + offset.z,
  ] as any;

  const wallSouthPosition = [
    position[0],
    position[1],
    size.height / 2 + offset.z,
  ] as any;

  const wallEastPosition = [
    -size.width / 2 + offset.x,
    position[1],
    position[2],
  ] as any;

  const wallWestPosition = [
    size.width / 2 + offset.x,
    position[1],
    position[2],
  ] as any;

  const wallAbovePosition = [
    position[0],
    size.depth / 2 + offset.y,
    position[2],
  ] as any;

  return (
    <>
      <mesh
        rotation-x={Math.PI / 2}
        position={wallAbovePosition}
        receiveShadow={true}
      >
        <planeGeometry args={[size.width, size.height]} />
        <meshStandardMaterial color={color} roughness={1} metalness={0.5} />
      </mesh>

      <mesh position={wallNorthPosition} receiveShadow={receiveShadow}>
        <planeGeometry args={[size.width, size.depth]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.0} />
      </mesh>

      <mesh
        rotation-x={Math.PI}
        position={wallSouthPosition}
        receiveShadow={receiveShadow}
      >
        <planeGeometry args={[size.width, size.depth]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.0} />
      </mesh>

      <mesh
        rotation-y={Math.PI / 2}
        position={wallEastPosition}
        receiveShadow={receiveShadow}
      >
        <planeGeometry args={[size.width + size.height, size.depth]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.0} />
      </mesh>

      <mesh
        rotation-y={-Math.PI / 2}
        position={wallWestPosition}
        receiveShadow={receiveShadow}
      >
        <planeGeometry args={[size.width + size.height, size.depth]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.0} />
      </mesh>
    </>
  );
}
