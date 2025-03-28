import { useEffect, useRef, useState } from "react";
import { MeshReflectorMaterial } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { Desktop } from "./Desktop";
import { CameraAnimation } from "./CameraAnimation";

export const DesktopBackground = () => {
  const environmentColor = "#000000";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.opacity = "0";
      if (loaded) {
        setTimeout(() => {
          if (canvasRef.current) {
            canvasRef.current.style.transition = "opacity 2s ease-in-out";
            canvasRef.current.style.opacity = "1";
          }
        }, 500);
      }
    }
  }, [loaded]);

  return (
    <Canvas
      ref={canvasRef}
      shadows
      dpr={[1, 1.5]}
      camera={{
        position: [2, 1.8, -11],
        rotation: [-3, -0.08, -3.15],
        fov: 45,
        near: 1,
        far: 20,
      }}
    >
      <CameraAnimation rotationAmount={0.035} rotationSpeed={0.25} />
      {/* <ambientLight intensity={0.5} color={"#a3f4ff"} /> */}
      <color attach="background" args={[environmentColor]} />
      <hemisphereLight intensity={0.05} groundColor={environmentColor} />
      <spotLight
        decay={0}
        position={[10, 20, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={1024}
      />
      <group position={[-0, -1, 0]}>
        <Desktop onLoad={() => setLoaded(true)} />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[100, 10]}
            resolution={1024}
            mixBlur={0.5}
            mixStrength={90}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#202020"
            metalness={0.8}
          />
        </mesh>
      </group>
      <EffectComposer enableNormalPass={false}>
        <Bloom
          luminanceThreshold={0}
          mipmapBlur
          luminanceSmoothing={0.0}
          intensity={2}
        />
        <DepthOfField
          target={[0, 0, 10]}
          focalLength={5}
          bokehScale={3}
          height={700}
        />
      </EffectComposer>
    </Canvas>
  );
};
