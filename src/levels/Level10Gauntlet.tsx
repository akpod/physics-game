import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import Player from '../components/Player';


export default function Level10Gauntlet() {
  const platformRef = useRef<any>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (platformRef.current) {
        platformRef.current.setNextKinematicTranslation({
            x: Math.sin(time) * 6,
            y: 0,
            z: -18
        });
    }
  });

  return (
    <group>
      <Player position={[0, 2, 0]} />

      {/* Start Pad */}
      <RigidBody type="fixed" position={[0, -0.5, 0]}>
        <Box args={[6, 1, 6]} material-color="#8D6238" />
        <Text position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} color="white" fontSize={0.6}>The Final Exam</Text>
      </RigidBody>

      {/* Trampoline gap */}
      <RigidBody type="fixed" position={[0, -5, -8]} restitution={2.2} friction={0}>
        <Box args={[6, 1, 6]} material-color="#444" />
      </RigidBody>

      {/* High Platform via tramp */}
      <RigidBody type="fixed" position={[0, 2, -18]}>
        <Box args={[4, 1, 4]} material-color="#8D6238" />
      </RigidBody>

      {/* Moving Platform */}
      <RigidBody ref={platformRef} type="kinematicPosition" position={[0, 2, -26]}>
        <Box args={[3, 0.5, 3]} material-color="#009A44" />
      </RigidBody>

      {/* Falling Blocks Trap */}
      <RigidBody mass={50} position={[0, 10, -32]}>
         <Box args={[2, 2, 2]} material-color="#EF3340" />
      </RigidBody>
      <RigidBody type="fixed" position={[0, -0.5, -34]}>
        <Box args={[4, 1, 10]} material-color="#8D6238" />
      </RigidBody>

      {/* Final Finish Zone */}
      <RigidBody type="fixed" position={[0, 0, -45]}>

        <Box args={[8, 1, 8]} material-color="#FEDD00" />
        <Text position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} color="black" fontSize={1}>VICTORY</Text>
      </RigidBody>
    </group>
  );
}
