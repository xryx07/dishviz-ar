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
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#ff9966" />
      <primitive object={scene} scale={2} position={[0, -0.5, 0]} />
    </group>
  );
};

useGLTF.preload("/models/pasta_dish.glb");
