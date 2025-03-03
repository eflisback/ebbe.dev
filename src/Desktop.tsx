import { useGLTF, RenderTexture, PerspectiveCamera, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group, Mesh } from "three";

export function Desktop() {
  const keyboard = useGLTF("/models/keyboard.glb");
  const monitor = useGLTF("/models/monitor.glb");
  const mouse = useGLTF("/models/mouse.glb");

  // Clone the monitor scene to create independent instances
  const leftMonitorScene = useMemo(() => monitor.scene.clone(), [monitor.scene]);
  const rightMonitorScene = useMemo(() => monitor.scene.clone(), [monitor.scene]);

  return (
    <group>
      {/* Keyboard */}
      <primitive
        object={keyboard.scene}
        position={[2.5, 0, -3]}
        scale={[7.5, 7.5, 7.5]}
        rotation={[0, Math.PI / 2 + 0.23, 0]}
      />
      {/* Left Monitor with Moving Text */}
      <MonitorWithText
        monitorScene={leftMonitorScene}
        position={[2.75, 0, 1]}
        scale={[0.1, 0.1, 0.1]}
        rotation={[0, 0.3, 0]}
        text="ebbe.dev"
      />
      {/* Right Monitor with Moving Text */}
      <MonitorWithText
        monitorScene={rightMonitorScene}
        position={[-2.75, 0, 1]}
        scale={[0.1, 0.1, 0.1]}
        rotation={[0, -0.3, 0]}
        text="Hello, Right Monitor!"
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
}

// Define the props for the MonitorWithText component
interface MonitorWithTextProps {
  monitorScene: Group; // The monitor model (cloned scene)
  text: string; // The text to display on the screen
  position?: [number, number, number]; // Position of the monitor
  scale?: [number, number, number]; // Scale of the monitor
  rotation?: [number, number, number]; // Rotation of the monitor
}

// Component to render a monitor with moving text
function MonitorWithText({ monitorScene, text, position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }: MonitorWithTextProps) {
  // Create a ref for the Text component
  const textRef = useRef<Mesh>(null);

  // Animate the text position
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2; // Move text back and forth
    }
  });

  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Render the monitor model */}
      <primitive object={monitorScene} />
      {/* Render the screen with dynamic text */}
      <mesh position={[0, 20.7, -0.15]} scale={[10, 10, 10]} rotation={[0, Math.PI , 0]}> {/* Adjust position to align with the monitor screen */}
        <planeGeometry args={[5, 2.8]} /> {/* Adjust size to fit the monitor screen */}
        <meshBasicMaterial toneMapped={false}>
          <RenderTexture attach="map" width={512} height={512} anisotropy={16}>
            <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[0, 0, 10]} />
            <color attach="background" args={["black"]} /> {/* Background color of the screen */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} />
            <Text
              ref={textRef}
              fontSize={3}
              color="#35c19f" // Text color
              anchorX="center"
              anchorY="middle"
            >
              {text}
            </Text>
          </RenderTexture>
        </meshBasicMaterial>
      </mesh>
    </group>
  );
}

// Preload the models (optional but recommended)
useGLTF.preload("/models/keyboard.glb");
useGLTF.preload("/models/monitor.glb");
useGLTF.preload("/models/mouse.glb");