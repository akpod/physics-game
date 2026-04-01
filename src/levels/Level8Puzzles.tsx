import { Box, Text } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import Player from '../components/Player';
import { useGameStore } from '../store/gameStore';

export default function Level8Puzzles() {
  
  return (
    <group>
      <Player position={[0, 2, 0]} />

      {/* Ground */}
      <RigidBody type="fixed" position={[0, -0.5, -5]}>
        <Box args={[20, 1, 20]} material-color="#8D6238" />
        <Text position={[0, 0.6, 5]} rotation={[-Math.PI / 2, 0, 0]} color="white" fontSize={0.5}>Push the blocks to build stairs</Text>
      </RigidBody>

      {/* Physics Puzzle Blocks */}
      <RigidBody position={[-3, 1, -5]} mass={1} friction={1} userData={{ pickable: true }}>
        <Box args={[2, 2, 2]} material-color="#333" />
      </RigidBody>
      <RigidBody position={[3, 1, -5]} mass={1} friction={1} userData={{ pickable: true }}>
        <Box args={[2, 2, 2]} material-color="#444" />
      </RigidBody>
      <RigidBody position={[0, 1, -8]} mass={1} friction={1} userData={{ pickable: true }}>
        <Box args={[2, 2, 2]} material-color="#555" />
      </RigidBody>

      {/* High Finish Pad representing the target */}
      <RigidBody type="fixed" position={[0, 4, -13]}>

        <Box args={[8, 1, 8]} material-color="#009A44" />
        <Text position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} color="white" fontSize={1}>GOAL (4m HIGH)</Text>
      </RigidBody>
    </group>
  );
}
