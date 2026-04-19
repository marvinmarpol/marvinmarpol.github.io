import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Vector3 } from "three";

import useKeyboard from "../hooks/useKeyboard";

const CAMERA_RADIUS = 0.5;

const ACCELERATION = 34; 
const FRICTION = 3;
const MAX_SPEED = 5;

interface Props {
  position?: {
    x: number;
    y: number;
    z: number;
  };
  clampOffset?: {
    x: number;
    y: number;
    z: number;
  };
  width?: number;
  height?: number;
  disabled?: boolean;
}

export default function FPSCamera({
  position = { x: 0, y: 0, z: 0 },
  clampOffset = { x: 0, y: 0, z: 0 },
  width = 1,
  height = 1,
  disabled = false,
}: Props) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const { camera } = useThree();
  const velocity = useRef(new Vector3());
  const direction = useRef(new Vector3());
  const keys = useKeyboard();

  useEffect(() => {
    camera.position.set(position.x, position.y, position.z);
  }, []);

  useFrame((_, delta) => {
    direction.current.set(0, 0, 0);

    if (disabled) {
      velocity.current.set(0, 0, 0);
      return;
    }

    if (keys["KeyW"]) direction.current.z += 1;
    if (keys["KeyS"]) direction.current.z -= 1;
    if (keys["KeyA"]) direction.current.x -= 1;
    if (keys["KeyD"]) direction.current.x += 1;

    direction.current.normalize();

    const forward = new Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new Vector3().crossVectors(forward, camera.up).normalize();

    // apply acceleration
    velocity.current.addScaledVector(
      forward,
      direction.current.z * ACCELERATION * delta,
    );
    velocity.current.addScaledVector(
      right,
      direction.current.x * ACCELERATION * delta,
    );

    // clamp max speed
    if (velocity.current.length() > MAX_SPEED) {
      velocity.current.setLength(MAX_SPEED);
    }

    // apply friction
    velocity.current.multiplyScalar(1 - FRICTION * delta);

    // move camera
    camera.position.addScaledVector(velocity.current, delta);

    // bounds
    camera.position.x = Math.max(
      -halfWidth + clampOffset.x + CAMERA_RADIUS,
      Math.min(halfWidth + clampOffset.x - CAMERA_RADIUS, camera.position.x),
    );
    camera.position.z = Math.max(
      -halfHeight + clampOffset.z + CAMERA_RADIUS,
      Math.min(halfHeight + clampOffset.z - CAMERA_RADIUS, camera.position.z),
    );

    camera.position.y = position.y;
  });

  return <></>;
}
