import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const PastaModel3D = () => {
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
      
      {/* Plate */}
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
      
      {/* Pasta nest/pile - main body */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.3 + Math.random() * 0.4;
        return (
          <mesh 
            key={`pasta-strand-${i}`}
            position={[
              Math.cos(angle) * radius,
              0.1 + Math.random() * 0.3,
              Math.sin(angle) * radius
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
            castShadow
          >
            <torusGeometry args={[0.15, 0.04, 8, 16]} />
            <meshStandardMaterial 
              color="#f4e6c3" 
              roughness={0.6}
            />
          </mesh>
        );
      })}
      
      {/* More pasta strands for volume */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.2 + Math.random() * 0.5;
        return (
          <mesh 
            key={`pasta-extra-${i}`}
            position={[
              Math.cos(angle) * radius,
              0.3 + Math.random() * 0.2,
              Math.sin(angle) * radius
            ]}
            rotation={[Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, 0]}
            castShadow
          >
            <capsuleGeometry args={[0.03, 0.4, 4, 8]} />
            <meshStandardMaterial 
              color="#f0dda8" 
              roughness={0.7}
            />
          </mesh>
        );
      })}
      
      {/* Tomato sauce */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.9, 0.08, 32]} />
        <meshStandardMaterial 
          color="#d32f2f" 
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
      
      {/* Sauce splashes */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 0.4 + Math.random() * 0.3;
        return (
          <mesh 
            key={`sauce-${i}`}
            position={[
              Math.cos(angle) * radius,
              0.2 + Math.random() * 0.1,
              Math.sin(angle) * radius
            ]}
            castShadow
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial 
              color="#c62828" 
              roughness={0.3}
            />
          </mesh>
        );
      })}
      
      {/* Basil leaves */}
      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2 + Math.PI / 6;
        const radius = 0.5;
        return (
          <mesh 
            key={`basil-${i}`}
            position={[
              Math.cos(angle) * radius,
              0.45,
              Math.sin(angle) * radius
            ]}
            rotation={[Math.random() * 0.5, Math.random() * Math.PI * 2, 0]}
            castShadow
          >
            <boxGeometry args={[0.25, 0.02, 0.15]} />
            <meshStandardMaterial 
              color="#2e7d32" 
              roughness={0.8}
            />
          </mesh>
        );
      })}
      
      {/* Parmesan cheese shavings */}
      {[...Array(15)].map((_, i) => {
        const angle = (i / 15) * Math.PI * 2;
        const radius = 0.1 + Math.random() * 0.6;
        return (
          <mesh 
            key={`cheese-${i}`}
            position={[
              Math.cos(angle) * radius,
              0.5 + Math.random() * 0.2,
              Math.sin(angle) * radius
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
          >
            <boxGeometry args={[0.08, 0.01, 0.12]} />
            <meshStandardMaterial 
              color="#fffacd" 
              roughness={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
};
