import { Box, Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import Player from '../components/Player';

export default function Level7Wind() {
  // In a real scenario we could query overlapping bodies, 
  // but we can just use sensor events to toggle a flag on the player.
  // Wait, Player component manages its own RigidBody, so we can't easily push it from outside without context or refs.
  // Actually, we can add an invisible kinematic body that scoops the player up, 
  // or just explain the wind puzzle: building a staircase out of boxes.
  
  return (
    <group>
      <Player position={[0, 2, 0]} />

      {/* Start */}
      <RigidBody type="fixed" position={[0, -0.5, 0]}>
        <Box args={[10, 1, 10]} material-color="#8D6238" />
        <Text position={[0, 0.6, -3]} rotation={[-Math.PI / 2, 0, 0]} color="white" fontSize={0.5}>Jump down and cross</Text>
      </RigidBody>

      {/* Pit with explicit Trampoline */}
      <RigidBody 
        type="fixed" 
        position={[0, -2, -15]} 
        restitution={2.0} 
        restitutionCombineRule={3 as any}
        onCollisionEnter={(e) => {
          if (e.other.rigidBody) {
             const currentVel = e.other.rigidBody.linvel();
             // Override vertical velocity to guarantee a high bounce, ignoring downward momentum
             e.other.rigidBody.setLinvel({ x: currentVel.x, y: 35, z: currentVel.z }, true);
          }
        }}
      >
        <Box args={[12, 1, 12]} material-color="#111" />
        <Text position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} color="white" fontSize={1}>TRAMPOLINE</Text>
      </RigidBody>

      {/* High Finish Pad */}
      <RigidBody type="fixed" position={[0, 5, -30]}>

        <Box args={[8, 1, 8]} material-color="#009A44" />
        <Text position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} color="white" fontSize={1}>GOAL</Text>
      </RigidBody>
    </group>
  );
}
