import { Box, Sphere } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useState } from 'react';
import Player from '../components/Player';

export default function SandboxMode() {
  const [objects, setObjects] = useState<number[]>([]);

  const spawnObject = () => {
    setObjects(prev => [...prev, Date.now()]);
  };

  return (
    <group>
      <Player position={[0, 2, 8]} />

      {/* Main Floor - Click to Spawn */}
      <RigidBody type="fixed" position={[0, -0.5, 0]}>
        <Box args={[40, 1, 40]} onClick={spawnObject}>
          <meshStandardMaterial color="#8D5524" />
        </Box>
      </RigidBody>

      {/* Ramps */}
      <RigidBody type="fixed" position={[-10, 2, -10]} rotation={[0, 0, Math.PI / 6]}>
        <Box args={[10, 1, 4]} material-color="#009A44" />
      </RigidBody>
      <RigidBody type="fixed" position={[10, 2, -10]} rotation={[0, 0, -Math.PI / 6]}>
        <Box args={[10, 1, 4]} material-color="#EF3340" />
      </RigidBody>

      {/* Spawned Objects */}
      {objects.map((id, index) => (
        <RigidBody key={id} position={[0, 10 + index * 2, 0]} colliders="ball" restitution={0.8} userData={{ pickable: true, id: `box-${index}` }}>
          <Sphere args={[1, 16, 16]}>
             <meshStandardMaterial color={index % 2 === 0 ? "#FEDD00" : "#EF3340"} />
          </Sphere>
        </RigidBody>
      ))}

      {/* Pickable Test Box */}
      <RigidBody position={[3, 1, 3]} colliders="cuboid" restitution={0.2} userData={{ pickable: true, id: 'test-box' }}>
        <Box args={[1, 1, 1]} material-color="#00AEEF" />
      </RigidBody>
    </group>
  );
}
