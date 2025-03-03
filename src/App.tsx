import { BakeShadows, MeshReflectorMaterial, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { Desktop } from "./Desktop";

function App() {
  const environmentColor = "#000000";

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [-1.5, 1, 5.5], fov: 45, near: 1, far: 20 }}
    >
      <ambientLight intensity={0.5} color={"#a3f4ff"}/>
      <color attach="background" args={[environmentColor]} />
      <hemisphereLight intensity={0.1} groundColor={environmentColor} />
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
        {/* Add keyboard, mouse, monitors here */}
        <Desktop />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 30]}
            resolution={2048}
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
        <pointLight
          distance={1.5}
          intensity={1}
          position={[-0.15, 0.7, 0]}
          color="orange"
        />
      </group>
      <EffectComposer enableNormalPass={false}>
        <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={5} />
        <DepthOfField target={[0, 0, 10]} focalLength={5} bokehScale={7} height={700} />
      </EffectComposer>
      <BakeShadows />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
