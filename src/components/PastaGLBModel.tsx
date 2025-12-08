import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const PastaGLBModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF("/models/pasta_dish.glb");

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    }
    
    // Animate spotlight in a circular motion
    if (spotlightRef.current) {
      const radius = 3;
      spotlightRef.current.position.x = Math.sin(time * 0.3) * radius;
      spotlightRef.current.position.z = Math.cos(time * 0.3) * radius + 2;
    }
    
    // Animate glow pulsing
    if (glowRef.current) {
      const scale = 1 + Math.sin(time * 1.5) * 0.05;
      glowRef.current.scale.set(scale, scale * 0.3, scale);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + Math.sin(time * 2) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Bright ambient light */}
      <ambientLight intensity={1.2} />
      
      {/* Main directional light - bright */}
      <directionalLight 
        position={[3, 5, 3]} 
        intensity={2} 
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Front fill light */}
      <directionalLight position={[0, 3, 5]} intensity={1.5} />
      
      {/* Warm accent light */}
      <pointLight position={[-3, 2, -3]} intensity={1} color="#ff9966" />
      
      {/* Top light */}
      <pointLight position={[0, 5, 0]} intensity={1.5} color="#ffffff" />
      
      {/* Animated spotlight to highlight the dish */}
      <spotLight
        ref={spotlightRef}
        position={[0, 6, 2]}
        angle={0.6}
        penumbra={0.5}
        intensity={3}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        target-position={[0, -0.5, 0]}
      />
      
      {/* Rim/back light for depth */}
      <pointLight position={[0, 2, -4]} intensity={1} color="#ffffff" />
      
      {/* Glow effect ring around the dish */}
      <mesh ref={glowRef} position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 2.2, 64]} />
        <meshBasicMaterial 
          color="#ff9966" 
          transparent 
          opacity={0.15} 
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Secondary glow layer */}
      <mesh position={[0, -0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 2.5, 64]} />
        <meshBasicMaterial 
          color="#ffcc88" 
          transparent 
          opacity={0.08} 
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <primitive object={scene} scale={2} position={[0, -0.5, 0]} castShadow receiveShadow />
    </group>
  );
};

useGLTF.preload("/models/pasta_dish.glb");
