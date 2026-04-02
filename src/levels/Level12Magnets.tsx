import { Box, Sphere, Cylinder, Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Player from '../components/Player';

export default function Level12Magnets() {
  const [polarity, setPolarity] = useState(1); // 1 = Attract, -1 = Repel
  const platformRef = useRef<any>(null);
  const block1Ref = useRef<any>(null);
  const block2Ref = useRef<any>(null);
  const lastToggleRef = useRef<number>(0);
  
  // Base magnet is at [0, 0.5, -5]
  const baseMagnetPos = new THREE.Vector3(0, 0.5, -5);

  useFrame(() => {
    // Platform hover logic
    if (platformRef.current) {
      const platPos = platformRef.current.translation();
      const dir = new THREE.Vector3(platPos.x - baseMagnetPos.x, platPos.y - baseMagnetPos.y, platPos.z - baseMagnetPos.z);
      const dist = Math.max(dir.length(), 1);
      dir.normalize();
      
      // Calculate continuous impulse based on polarity
      // Using applyImpulse instead of addForce works reliably in useFrame
      const forceMag = (20 / (dist * dist)) * -polarity; 
      platformRef.current.applyImpulse({ x: 0, y: dir.y * forceMag, z: 0 }, true);
    }

    // Blocks logic
    const blocks = [block1Ref, block2Ref];
    blocks.forEach((bRef) => {
      if (bRef.current) {
        const bPos = bRef.current.translation();
        const dir = new THREE.Vector3(bPos.x - baseMagnetPos.x, bPos.y - baseMagnetPos.y, bPos.z - baseMagnetPos.z);
        const dist = Math.max(dir.length(), 1);
        dir.normalize();
        
        const forceMag = (5 / (dist * dist)) * -polarity;
        bRef.current.applyImpulse({ x: dir.x * forceMag, y: dir.y * forceMag, z: dir.z * forceMag }, true);
      }
    });
  });

  return (
    <group>
      <Player position={[0, 2, 8]} />
      
      {/* Floor */}
      <RigidBody type="fixed" position={[0, -0.5, 0]}>
        <Box args={[30, 1, 30]} material-color="#333333" />
      </RigidBody>

      {/* Giant Floor Magnet */}
      <RigidBody type="fixed" position={[0, 0.5, -5]}>
        <Cylinder args={[3, 3, 1, 32]}>
           <meshStandardMaterial color={polarity === 1 ? "#EF3340" : "#3340EF"} emissive={polarity === 1 ? "#330000" : "#000033"} />
        </Cylinder>
        <Text depthOffset={-2} position={[0, 0.6, 0]} color="white" fontSize={0.8} rotation={[-Math.PI/2, 0, 0]}>
          {polarity === 1 ? "ATTRACT" : "REPEL"}
        </Text>
      </RigidBody>

      {/* Polarity Switch Button */}
      <group position={[5, 0.1, 0]}>
        <RigidBody 
          type="fixed" 
          onCollisionEnter={() => {
            const now = Date.now();
            if (now - lastToggleRef.current > 500) {
              setPolarity((p) => p * -1);
              lastToggleRef.current = now;
            }
          }}
        >
          <Cylinder args={[1, 1, 0.2, 16]}>
            <meshStandardMaterial color="#f1c40f" emissive="#555500" />
          </Cylinder>
        </RigidBody>
        <Text position={[0, 1, 0]} fontSize={0.5} color="white">
          TOGGLE POLARITY
        </Text>
      </group>

      {/* Mag-Lev Platform */}
      <RigidBody 
        ref={platformRef} 
        type="dynamic" 
        position={[0, 1.5, -5]} 
        mass={2} 
        enabledTranslations={[false, true, false]}
        enabledRotations={[false, false, false]}
      >
        <Box args={[4, 0.5, 4]}>
          <meshStandardMaterial color="#00ffff" opacity={0.8} transparent />
        </Box>
      </RigidBody>

      {/* Upper Landing Area */}
      <RigidBody type="fixed" position={[0, 8, -15]}>
         <Box args={[10, 1, 10]} material-color="#4CAF50" />
         <Text position={[0, 1, 0]} fontSize={1} color="white">SUCCESS!</Text>
      </RigidBody>

      {/* Magnetic Blocks */}
      <RigidBody ref={block1Ref} type="dynamic" position={[-3, 1, 0]} mass={0.5} userData={{ pickable: true }}>
        <Box args={[0.8, 0.8, 0.8]} material-color="silver" />
      </RigidBody>
      <RigidBody ref={block2Ref} type="dynamic" position={[3, 1, 0]} mass={0.5} userData={{ pickable: true }}>
        <Sphere args={[0.5, 16, 16]} material-color="silver" />
      </RigidBody>
    </group>
  );
}
