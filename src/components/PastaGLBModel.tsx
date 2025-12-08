import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const PastaGLBModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/pasta_dish.glb");

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Darker ambient for moody atmosphere */}
      <ambientLight intensity={0.15} />
      
      {/* Main directional light with shadows */}
      <directionalLight 
        position={[3, 5, 3]} 
        intensity={0.4} 
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Subtle warm accent light */}
      <pointLight position={[-3, 2, -3]} intensity={0.15} color="#ff9966" />
      
      {/* Spotlight to highlight the dish */}
      <spotLight
        position={[0, 6, 2]}
        angle={0.4}
        penumbra={0.8}
        intensity={0.8}
        color="#fffaf0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Rim light for depth */}
      <pointLight position={[0, -2, -3]} intensity={0.1} color="#4a90d9" />
      
      <primitive object={scene} scale={2} position={[0, -0.5, 0]} castShadow receiveShadow />
    </group>
  );
};

useGLTF.preload("/models/pasta_dish.glb");
