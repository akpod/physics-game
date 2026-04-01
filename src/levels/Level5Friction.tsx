import { Box, Text } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import Player from '../components/Player';
import { useGameStore } from '../store/gameStore';

export default function Level5Friction() {
  return (
    <group>
      <Player position={[0, 2, 8]} />

      {/* Start Pad */}
      <RigidBody type="fixed" position={[0, -0.5, 8]}>
        <Box args={[6, 1, 6]} material-color="#8D5524" />
      </RigidBody>

      {/* Ice Floor (Low Friction) */}
      <RigidBody type="fixed" position={[-4, -0.5, 0]} friction={0} frictionCombineRule={1 as any}>
        <Box args={[4, 1, 12]} material-color="#A5F2F3" />
        <Text position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} color="black" fontSize={0.8}>ICE</Text>
      </RigidBody>

      {/* Sand Floor (High Friction) */}
      <RigidBody type="fixed" position={[4, -0.5, 0]} friction={5} frictionCombineRule={3 as any}>
        <Box args={[4, 1, 12]} material-color="#D2B48C" />
        <Text position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} color="black" fontSize={0.8}>SAND</Text>
      </RigidBody>

      {/* End Pad */}
      <RigidBody type="fixed" position={[0, -0.5, -8]}>

        <Box args={[12, 1, 6]} material-color="#009A44" />
        <Text position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} color="white" fontSize={1}>GOAL</Text>
      </RigidBody>
    </group>
  );
}
