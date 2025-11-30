import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export const DishModel3D = () => {
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.8} />
      
      {/* Main plate */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <cylinderGeometry args={[2, 2, 0.15, 64]} />
        <meshStandardMaterial 
          color="#f5f5f5" 
          metalness={0.4} 
          roughness={0.3}
        />
      </mesh>
      
      {/* Plate rim */}
      <mesh position={[0, -0.5, 0]}>
        <torusGeometry args={[2, 0.08, 16, 64]} />
        <meshStandardMaterial 
          color="#e8e8e8" 
          metalness={0.5} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Burger bottom bun */}
      <mesh position={[0, -0.25, 0]} castShadow>
        <sphereGeometry args={[0.9, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color="#d4a574" 
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Sesame seeds on bottom bun */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.5 + Math.random() * 0.3;
        return (
          <mesh 
            key={`seed-bottom-${i}`}
            position={[
              Math.cos(angle) * radius, 
              -0.05 + Math.random() * 0.05, 
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#f5e6d3" />
          </mesh>
        );
      })}
      
      {/* Lettuce */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.85, 0.9, 0.12, 32]} />
        <meshStandardMaterial 
          color="#7cb342" 
          roughness={0.9}
          metalness={0}
        />
      </mesh>
      
      {/* Tomato slice */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.08, 32]} />
        <meshStandardMaterial 
          color="#e53935" 
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
      
      {/* Cheese slice */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.6, 0.05, 1.6]} />
        <meshStandardMaterial 
          color="#fdd835" 
          roughness={0.5}
          metalness={0.2}
        />
      </mesh>
      
      {/* Beef patty */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.85, 0.85, 0.25, 32]} />
        <meshStandardMaterial 
          color="#5d4037" 
          roughness={0.9}
          metalness={0}
        />
      </mesh>
      
      {/* Grill marks on patty */}
      {[...Array(4)].map((_, i) => (
        <mesh 
          key={`grill-${i}`}
          position={[-0.4 + i * 0.3, 0.58, 0]}
          rotation={[0, 0, Math.PI / 6]}
        >
          <boxGeometry args={[0.05, 0.01, 0.9]} />
          <meshStandardMaterial color="#3e2723" />
        </mesh>
      ))}
      
      {/* Pickles */}
      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2;
        return (
          <mesh 
            key={`pickle-${i}`}
            position={[
              Math.cos(angle) * 0.5, 
              0.62, 
              Math.sin(angle) * 0.5
            ]}
            castShadow
          >
            <cylinderGeometry args={[0.15, 0.15, 0.03, 16]} />
            <meshStandardMaterial 
              color="#8bc34a" 
              roughness={0.7}
            />
          </mesh>
        );
      })}
      
      {/* Burger top bun */}
      <mesh position={[0, 0.95, 0]} rotation={[Math.PI, 0, 0]} castShadow>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
        <meshStandardMaterial 
          color="#c4945a" 
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
      
      {/* Sesame seeds on top bun */}
      {[...Array(20)].map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 0.3 + Math.random() * 0.5;
        const height = 0.95 + Math.sqrt(1 - (radius * radius)) * 0.4;
        return (
          <mesh 
            key={`seed-top-${i}`}
            position={[
              Math.cos(angle) * radius, 
              height, 
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#f5e6d3" />
          </mesh>
        );
      })}
    </group>
  );
};
