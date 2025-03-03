import { useLoader } from "@react-three/fiber";
import { Group, TextureLoader } from "three";

interface MonitorWithImageProps {
  monitorScene: Group;
  imageUrl: string;
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
}

export const MonitorWithImage = ({
  monitorScene, imageUrl, position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0],
}: MonitorWithImageProps) => {
  const texture = useLoader(TextureLoader, imageUrl);

  return (
    <group position={position} scale={scale} rotation={rotation}>
      <primitive object={monitorScene} />
      <mesh
        position={[0, 20.7, -0.15]}
        scale={[10, 10, 10]}
        rotation={[0, Math.PI, 0]}
      >
        <planeGeometry args={[5, 2.8]} />{" "}
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
};
