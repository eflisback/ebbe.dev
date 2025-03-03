import { useThree, useFrame } from "@react-three/fiber";

interface CameraAnimationProps {
  rotationAmount: number;
  rotationSpeed: number;
}

export const CameraAnimation = ({ rotationAmount, rotationSpeed }: CameraAnimationProps) => {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Animate rotation.y (left/right)
    camera.rotation.y = -0.08 + Math.sin(time * rotationSpeed) * rotationAmount;

    // Animate rotation.x (up/down) at half the rate and amount
    camera.rotation.x = -3 + Math.sin(time * (rotationSpeed * 0.5)) * (rotationAmount * 0.5);
  });

  return null;
};