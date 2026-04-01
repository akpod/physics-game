import { Box, Text } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import Player from '../components/Player';
import { useGameStore } from '../store/gameStore';

export default function Level3Gravity() {
  const setGravityScale = useGameStore(s => s.setGravityScale);
  return (
    <group>
      <Player position={[0, 2, 8]} />

      {/* Starting Platform */}
      <RigidBody type="fixed" position={[0, -0.5, 8]}>
        <Box args={[4, 1, 4]} material-color="#8D5524" />
      </RigidBody>

      {/* Normal Gravity Platform */}
      <RigidBody type="fixed" position={[0, -0.5, 2]}>
        <Box args={[4, 1, 4]} material-color="#009A44" />
        <Text position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} color="white" fontSize={0.5}>Normal G</Text>
      </RigidBody>

      {/* Dynamic Objects in Normal Gravity */}
      <RigidBody position={[-1, 2, 2]} type="dynamic" mass={1} userData={{ pickable: true }}>
        <Box args={[0.5, 0.5, 0.5]} material-color="blue" />
      </RigidBody>
      <RigidBody position={[1, 2, 2]} type="dynamic" mass={1} userData={{ pickable: true }}>
        <Box args={[0.5, 0.5, 0.5]} material-color="yellow" />
      </RigidBody>

      {/* Low Gravity Platform / Finish */}
      <RigidBody type="fixed" position={[0, -0.5, -6]}>
        <CuboidCollider 
            args={[4, 5, 4]} 
            position={[0, 5, 0]} 
            sensor 
            onIntersectionEnter={() => setGravityScale(0.05)} 
            onIntersectionExit={() => setGravityScale(1.0)} 
        />
        <Box args={[4, 1, 4]} material-color="#EF3340" />
        <Text position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} color="white" fontSize={0.5}>Space Jump</Text>
      </RigidBody>

      {/* Dynamic Objects in Space Gravity */}
      <RigidBody position={[-1, 2, -6]} type="dynamic" mass={1} gravityScale={0.05} userData={{ pickable: true }}>
        <Box args={[0.5, 0.5, 0.5]} material-color="purple" />
      </RigidBody>
      <RigidBody position={[1, 2, -6]} type="dynamic" mass={1} gravityScale={0.05} userData={{ pickable: true }}>
        <Box args={[0.5, 0.5, 0.5]} material-color="orange" />
      </RigidBody>
      
      {/* Bottom catch floor */}
      <RigidBody type="fixed" position={[0, -10, 0]}>
        <Box args={[40, 1, 40]} material-color="black" />
        <Text position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 0]} color="white" fontSize={1}>Fell down!</Text>
      </RigidBody>
    </group>
  );
}
