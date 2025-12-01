import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const DessertModel3D = () => {
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
      
      {/* Decorative plate */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <cylinderGeometry args={[2, 2, 0.15, 64]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.6} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Plate rim with gold accent */}
      <mesh position={[0, -0.5, 0]}>
        <torusGeometry args={[2, 0.08, 16, 64]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={0.8} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Bottom cake layer - chocolate */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.9, 0.95, 0.4, 32]} />
        <meshStandardMaterial 
          color="#3e2723" 
          roughness={0.6}
        />
      </mesh>
      
      {/* Middle cake layer */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.85, 0.88, 0.35, 32]} />
        <meshStandardMaterial 
          color="#4e342e" 
          roughness={0.6}
        />
      </mesh>
      
      {/* Top cake layer */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.82, 0.3, 32]} />
        <meshStandardMaterial 
          color="#5d4037" 
          roughness={0.6}
        />
      </mesh>
      
      {/* Chocolate ganache drip effect */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.82;
        return (
          <mesh 
            key={`drip-${i}`}
            position={[
              Math.cos(angle) * radius,
              0.3 - Math.random() * 0.3,
              Math.sin(angle) * radius
            ]}
            castShadow
          >
            <cylinderGeometry args={[0.05, 0.08, 0.3 + Math.random() * 0.2, 8]} />
            <meshStandardMaterial 
              color="#2e1a1a" 
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>
        );
      })}
      
      {/* Whipped cream topping */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <sphereGeometry args={[0.4, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color="#fffef0" 
          roughness={0.3}
        />
      </mesh>
      
      {/* Whipped cream swirls */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 0.3;
        return (
          <mesh 
            key={`cream-${i}`}
            position={[
              Math.cos(angle) * radius,
              0.85,
              Math.sin(angle) * radius
            ]}
            rotation={[0, angle, 0]}
            castShadow
          >
            <coneGeometry args={[0.08, 0.25, 16]} />
            <meshStandardMaterial 
              color="#fffef5" 
              roughness={0.3}
            />
          </mesh>
        );
      })}
      
      {/* Fresh berries on top */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.15 + Math.random() * 0.15;
        const berry = i % 3;
        return (
          <mesh 
            key={`berry-${i}`}
            position={[
              Math.cos(angle) * radius,
              0.95 + Math.random() * 0.1,
              Math.sin(angle) * radius
            ]}
            castShadow
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial 
              color={berry === 0 ? "#c62828" : berry === 1 ? "#6a1b9a" : "#d32f2f"} 
              roughness={0.5}
              metalness={0.1}
            />
          </mesh>
        );
      })}
      
      {/* Chocolate shavings */}
      {[...Array(10)].map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const radius = 0.4 + Math.random() * 0.3;
        return (
          <mesh 
            key={`shaving-${i}`}
            position={[
              Math.cos(angle) * radius,
              0.6 + Math.random() * 0.2,
              Math.sin(angle) * radius
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
          >
            <boxGeometry args={[0.1, 0.01, 0.15]} />
            <meshStandardMaterial 
              color="#1a0f0a" 
              roughness={0.6}
            />
          </mesh>
        );
      })}
      
      {/* Mint leaf garnish */}
      <mesh 
        position={[0, 1.05, 0]}
        rotation={[Math.PI / 6, 0, 0]}
        castShadow
      >
        <boxGeometry args={[0.12, 0.02, 0.18]} />
        <meshStandardMaterial 
          color="#1b5e20" 
          roughness={0.8}
        />
      </mesh>
    </group>
  );
};
