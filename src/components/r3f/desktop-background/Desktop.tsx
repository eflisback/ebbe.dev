import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { MonitorWithImage } from "./MonitorWithImage";

const imagePairs = [
  [
    "/images/left_monitor_screenshot.png",
    "/images/right_monitor_screenshot.png",
  ],
  [
    "/images/left_monitor_screenshot_2.png",
    "/images/right_monitor_screenshot_2.png",
  ],
];

export const Desktop = () => {
  const keyboard = useGLTF("/models/keyboard.glb");
  const monitor = useGLTF("/models/monitor.glb");
  const mouse = useGLTF("/models/mouse.glb");

  const leftMonitorScene = useMemo(
    () => monitor.scene.clone(),
    [monitor.scene]
  );
  const rightMonitorScene = useMemo(
    () => monitor.scene.clone(),
    [monitor.scene]
  );

  const randomImagePair =
    imagePairs[Math.floor(Math.random() * imagePairs.length)];

  return (
    <group>
      {/* Keyboard */}
      <primitive
        object={keyboard.scene}
        position={[2.5, 0, -3]}
        scale={[7.5, 7.5, 7.5]}
        rotation={[0, Math.PI / 2 + 0.23, 0]}
      />
      {/* Left Monitor */}
      <MonitorWithImage
        monitorScene={leftMonitorScene}
        imageUrl={randomImagePair[0]}
        position={[2.75, 0, 1]}
        scale={[0.1, 0.1, 0.1]}
        rotation={[0, 0.3, 0]}
      />
      {/* Right Monitor */}
      <MonitorWithImage
        monitorScene={rightMonitorScene}
        imageUrl={randomImagePair[1]}
        position={[-2.75, 0, 1]}
        scale={[0.1, 0.1, 0.1]}
        rotation={[0, -0.3, 0]}
      />
      {/* Mouse */}
      <primitive
        object={mouse.scene}
        position={[-2, 0, -2]}
        scale={[6.25, 6.25, 6.25]}
        rotation={[0, Math.PI + 0.3, 0]}
      />
    </group>
  );
};

useGLTF.preload("/models/keyboard.glb");
useGLTF.preload("/models/monitor.glb");
useGLTF.preload("/models/mouse.glb");
