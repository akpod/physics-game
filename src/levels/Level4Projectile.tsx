import { Box, Sphere } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useState, useRef } from 'react';
import Player from '../components/Player';
import { useGameStore } from '../store/gameStore';

export default function Level4Projectile() {
  const ballRef = useRef<any>(null);
  const [launched, setLaunched] = useState(false);

  const launchBall = () => {
    if (!ballRef.current || launched) return;
    setLaunched(true);
    // Applies an impulse up and forward (projectile motion)
    ballRef.current.applyImpulse({ x: 0, y: 15, z: -15 }, true);
  };

  return (
    <group>
      <Player position={[0, 2, 8]} />
      
      {/* Floor */}
      <RigidBody type="fixed" position={[0, -0.5, 0]}>
        <Box args={[16, 1, 24]} material-color="#8D5524" />
      </RigidBody>

      {/* Launcher UI Area */}
      <RigidBody type="fixed" position={[0, -0.4, 5]}>
        <Box args={[4, 0.2, 4]} material-color="#FEDD00" />
      </RigidBody>

      {/* Projectile Ball */}
      <RigidBody ref={ballRef} position={[0, 1, 5]} colliders="ball" mass={1} restitution={0.8}>
         <Sphere args={[0.5, 32, 32]} onClick={launchBall} castShadow>
           <meshStandardMaterial color="#EF3340" />
         </Sphere>
      </RigidBody>

      {/* Target Wall */}
      <RigidBody type="fixed" position={[0, 4, -8]}>

        <Box args={[4, 8, 1]} material-color="#009A44" />
      </RigidBody>
    </group>
  );
}
