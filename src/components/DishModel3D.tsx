import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export const DishModel3D = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      {/* Main dish plate */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
        <meshStandardMaterial color="#f8f8f8" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Food on plate - burger bun top */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#d4a574" roughness={0.8} />
      </mesh>
      
      {/* Lettuce layer */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.1, 32]} />
        <meshStandardMaterial color="#7cb342" roughness={0.7} />
      </mesh>
      
      {/* Patty */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.15, 32]} />
        <meshStandardMaterial color="#5d4037" roughness={0.9} />
      </mesh>
      
      {/* Burger bun bottom */}
      <mesh position={[0, -0.05, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#c4945a" roughness={0.8} />
      </mesh>
    </group>
  );
};
