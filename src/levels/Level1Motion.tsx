import { Box, Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import Player from '../components/Player';

export default function Level1Motion() {
  return (
    <group>
      {/* Player Start Position */}
      <Player position={[0, 2, 8]} />

      {/* Track */}
      <RigidBody type="fixed" position={[0, -0.4, 0]}>
        <Box args={[4, 0.2, 20]}>
          <meshStandardMaterial color="#8D5524" />
        </Box>
      </RigidBody>

      {/* Speed Boost Zone (Visual and Physical: low friction) */}
      <RigidBody type="fixed" position={[0, -0.3, 0]} friction={0}>
        <Box args={[4, 0.2, 5]}>
          <meshStandardMaterial color="#EF3340" /> {/* Red Boost Zone */}
        </Box>
        <Text depthOffset={-2} position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]} color="white" fontSize={0.5}>
          ICE!
        </Text>
      </RigidBody>
      {/* Start Pad */}
      <RigidBody type="fixed" position={[0, -0.3, 8]}>
        <Box args={[4, 0.2, 4]}>
          <meshStandardMaterial color="#FEDD00" /> {/* Yellow Start Zone */}
        </Box>
      </RigidBody>
    </group>
  );
}
