import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text, Cylinder } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import Player from '../components/Player';


export default function Level9Pendulum() {
  const pendulum1Ref = useRef<any>(null);
  const pendulum2Ref = useRef<any>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pendulum1Ref.current) {
        // Swing via rotation
        pendulum1Ref.current.setNextKinematicRotation({
            x: 0,
            y: 0,
            z: Math.sin(time * 3) * 1.5,
            w: Math.cos(time * 3 * 0.5) // basic quaternion approx for swing
        });
    }
    if (pendulum2Ref.current) {
        pendulum2Ref.current.setNextKinematicRotation({
            x: 0,
            y: 0,
            z: Math.cos(time * 2.5) * 1.5,
            w: Math.sin(time * 2.5 * 0.5)
        });
    }
  });

  return (
    <group>
      <Player position={[0, 2, 0]} />

      {/* Bridge */}
      <RigidBody type="fixed" position={[0, -0.5, -15]}>
        <Box args={[4, 1, 40]} material-color="#8D6238" />
        <Text position={[0, 0.6, 15]} rotation={[-Math.PI / 2, 0, 0]} color="white" fontSize={0.5}>Dodge the swinging hazards</Text>
      </RigidBody>

      {/* Pendulum 1 */}
      <RigidBody ref={pendulum1Ref} type="kinematicPosition" position={[0, 6, -10]}>
         <Cylinder args={[0.2, 0.2, 8]} position={[0, -4, 0]} material-color="#EF3340" />
         <Box args={[2, 2, 2]} position={[0, -8, 0]} material-color="#333" />
      </RigidBody>

      {/* Pendulum 2 */}
      <RigidBody ref={pendulum2Ref} type="kinematicPosition" position={[0, 6, -20]}>
         <Cylinder args={[0.2, 0.2, 8]} position={[0, -4, 0]} material-color="#EF3340" />
         <Box args={[2, 2, 2]} position={[0, -8, 0]} material-color="#333" />
      </RigidBody>

      {/* Finish Pad */}
      <RigidBody type="fixed" position={[0, -0.5, -35]}>

        <Box args={[8, 1, 8]} material-color="#009A44" />
        <Text position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} color="white" fontSize={1}>GOAL</Text>
      </RigidBody>
    </group>
  );
}
