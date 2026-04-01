import { Box } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import Player from '../components/Player';

export default function Level2Forces() {
  return (
    <group>
      <Player position={[0, 2, 8]} />

      {/* Floor */}
      <RigidBody type="fixed" position={[0, -0.5, 0]}>
        <Box args={[16, 1, 20]}>
          <meshStandardMaterial color="#8D5524" />
        </Box>
      </RigidBody>

      {/* Heavy Box (Hard to push) */}
      <RigidBody position={[-2, 1, 0]} colliders="cuboid" mass={100} restitution={0}>
        <Box args={[2, 2, 2]}>
          <meshStandardMaterial color="#333" />
        </Box>
      </RigidBody>

      {/* Light Box (Easy to push) */}
      <RigidBody position={[2, 0.5, 0]} colliders="cuboid" mass={1} restitution={0}>
        <Box args={[1, 1, 1]}>
          <meshStandardMaterial color="#FEDD00" />
        </Box>
      </RigidBody>
      
    </group>
  );
}
