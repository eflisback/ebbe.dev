import { useThree, useFrame } from "@react-three/fiber";

interface CameraAnimationProps {
  rotationAmount: number;
  rotationSpeed: number;
}

export const CameraAnimation = ({ rotationAmount, rotationSpeed }: CameraAnimationProps) => {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    camera.rotation.y = -0.08 + Math.sin(time * rotationSpeed) * rotationAmount;
    camera.rotation.x = -3 + Math.sin(time * (rotationSpeed * 0.5)) * (rotationAmount * 0.5);
  });

  return null;
};