import { Box, Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import Player from '../components/Player';

export default function Level11Seesaw() {
  return (
    <group>
      <Player position={[0, 2, 8]} />
      {/* Start Platform */}
      <RigidBody type="fixed" position={[0, -0.5, 8]}>
        <Box args={[6, 1, 6]} material-color="#8D5524" />
      </RigidBody>

      {/* Fulcrum */}
      <RigidBody type="fixed" position={[0, -0.5, 0]}>
        <Box args={[4, 1, 1]} material-color="#333" />
      </RigidBody>

      {/* Plank */}
      <RigidBody type="dynamic" position={[0, 0.5, 0]} mass={10} colliders="cuboid">
        <Box args={[4, 0.2, 14]} material-color="#FEDD00" />
      </RigidBody>

      {/* Target Platform */}
      <RigidBody type="fixed" position={[0, -0.5, -8]}>
        <Box args={[6, 1, 6]} material-color="#009A44" />
        <Text depthOffset={-2} position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} color="white" fontSize={1}>GOAL</Text>
      </RigidBody>
    </group>
  );
}
