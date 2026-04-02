import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import Player from '../components/Player';


export default function Level6Kinematics() {
  const platform1Ref = useRef<any>(null);
  const platform2Ref = useRef<any>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (delta > 0) {
        if (platform1Ref.current) {
            const pos = platform1Ref.current.translation();
            platform1Ref.current.setLinvel({
                x: (Math.sin(time * 2) * 5 - pos.x) / delta,
                y: 0,
                z: 0
            }, true);
        }
        if (platform2Ref.current) {
            const pos = platform2Ref.current.translation();
            platform2Ref.current.setLinvel({
                x: (Math.cos(time * 1.5) * 6 - pos.x) / delta,
                y: 0,
                z: 0
            }, true);
        }
    }
  });

  return (
    <group>
      <Player position={[0, 2, 0]} />

      {/* Start Platform */}
      <RigidBody type="fixed" position={[0, -0.5, 0]}>
        <Box args={[6, 1, 6]} material-color="#8D6238" />
      </RigidBody>

      {/* Moving Platform 1 */}
      <RigidBody ref={platform1Ref} type="kinematicVelocity" position={[0, 0, -10]} friction={5} frictionCombineRule={3 as any}>
        <Box args={[4, 0.5, 4]} material-color="#009A44" />
      </RigidBody>

      {/* Moving Platform 2 */}
      <RigidBody ref={platform2Ref} type="kinematicVelocity" position={[0, 0, -20]} friction={5} frictionCombineRule={3 as any}>
        <Box args={[3, 0.5, 3]} material-color="#EF3340" />
      </RigidBody>

      {/* Finish Pad */}
      <RigidBody type="fixed" position={[0, -0.5, -30]}>

        <Box args={[8, 1, 8]} material-color="#FEDD00" />
        <Text depthOffset={-2} position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} color="black" fontSize={1}>GOAL</Text>
      </RigidBody>
    </group>
  );
}
