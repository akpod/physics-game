import { Box, Sphere, Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Player from '../components/Player';

export default function Level12Magnets() {
  const magnetRef = useRef<any>(null);
  const blockRef = useRef<any>(null);

  useFrame(() => {
    if (!magnetRef.current || !blockRef.current) return;
    const magPos = magnetRef.current.translation();
    const blkPos = blockRef.current.translation();
    
    // Calculate direction from block to magnet
    const dir = new THREE.Vector3(magPos.x - blkPos.x, magPos.y - blkPos.y, magPos.z - blkPos.z);
    const dist = Math.max(dir.length(), 1); // Avoid infinite force
    dir.normalize();

    // Apply inverse-square law force
    const forceMag = 150 / (dist * dist);
    blockRef.current.applyImpulse({ x: dir.x * forceMag, y: dir.y * forceMag, z: dir.z * forceMag }, true);
  });

  return (
    <group>
      <Player position={[0, 2, 8]} />
      
      {/* Floor */}
      <RigidBody type="fixed" position={[0, -0.5, 0]}>
        <Box args={[20, 1, 20]} material-color="#8D5524" />
      </RigidBody>

      {/* Giant Magnet */}
      <RigidBody ref={magnetRef} type="fixed" position={[0, 5, -5]}>
        <Sphere args={[2, 32, 32]}>
           <meshStandardMaterial color="#EF3340" />
        </Sphere>
        <Text depthOffset={-2} position={[0, 2.5, 0]} color="white" fontSize={1}>MAGNET</Text>
      </RigidBody>

      {/* Magnetic Block */}
      <RigidBody ref={blockRef} type="dynamic" position={[0, 1, 5]} mass={1} userData={{ pickable: true }}>
        <Box args={[1, 1, 1]} material-color="silver" />
      </RigidBody>
    </group>
  );
}
