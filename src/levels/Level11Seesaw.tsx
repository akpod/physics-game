import { Box, Cylinder, Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useState } from 'react';
import Player from '../components/Player';

export default function Level11Seesaw() {
  const [anvilDropped, setAnvilDropped] = useState(false);

  return (
    <group>
      <Player position={[0, 2, 8]} />
      {/* Start Platform */}
      <RigidBody type="fixed" position={[0, -0.5, 8]}>
        <Box args={[8, 1, 8]} material-color="#8D5524" />
      </RigidBody>

      {/* Button to drop anvil */}
      <group position={[3, -0.4, 8]}>
        <RigidBody 
          type="fixed" 
          onCollisionEnter={() => {
            if (!anvilDropped) setAnvilDropped(true);
          }}
        >
          <Cylinder args={[0.8, 0.8, 0.2, 16]}>
            <meshStandardMaterial color={anvilDropped ? "green" : "red"} />
          </Cylinder>
        </RigidBody>
        <Text position={[0, 0.8, 0]} fontSize={0.4} color="white">
          DROP WEIGHT
        </Text>
      </group>

      {/* The Heavy Anvil that drops */}
      {anvilDropped && (
        <RigidBody type="dynamic" position={[0, 15, -6]} mass={150}>
          <Box args={[2, 2, 2]} material-color="#222222" />
        </RigidBody>
      )}

      {/* Fulcrum */}
      <RigidBody type="fixed" position={[0, 0.5, 0]}>
        <Cylinder args={[0.5, 0.5, 4, 16]} rotation={[0, 0, Math.PI / 2]} material-color="#555" />
      </RigidBody>

      {/* Plank */}
      <RigidBody 
        type="dynamic" 
        position={[0, 1.2, 0]} 
        mass={10} 
        colliders="cuboid"
        enabledTranslations={[false, true, false]}
        enabledRotations={[true, false, false]}
      >
        <Box args={[4, 0.2, 16]} material-color="#FEDD00" />
      </RigidBody>

      {/* Pickable Counterweights for manual puzzles */}
      <RigidBody type="dynamic" position={[-2, 1, 8]} mass={5} userData={{ pickable: true }}>
        <Box args={[1, 1, 1]} material-color="silver" />
      </RigidBody>
      <RigidBody type="dynamic" position={[-3, 1, 7]} mass={5} userData={{ pickable: true }}>
        <Box args={[1, 1, 1]} material-color="silver" />
      </RigidBody>

      {/* Target Platform - High in the air */}
      <RigidBody type="fixed" position={[0, 12, 10]}>
        <Box args={[8, 1, 8]} material-color="#009A44" />
        <Text depthOffset={-2} position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} color="white" fontSize={1}>GOAL</Text>
      </RigidBody>
    </group>
  );
}
