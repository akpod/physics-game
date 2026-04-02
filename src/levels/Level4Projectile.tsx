import { Box, Sphere, Text, Cylinder, Cone } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Player from '../components/Player';

export default function Level4Projectile() {
  const ballRef = useRef<any>(null);
  const [launched, setLaunched] = useState(false);
  const pointerRef = useRef<any>(null);
  const textRef = useRef<any>(null);
  const angleRef = useRef(45);

  const launchBall = () => {
    if (!ballRef.current || launched) return;
    setLaunched(true);
    
    // Launch based on the swept angle overriding any existing drift
    const speed = 15; // Realistic speed to hit the wall nicely
    const angleRad = (angleRef.current * Math.PI) / 180;
    const velY = Math.sin(angleRad) * speed;
    const velZ = -Math.cos(angleRad) * speed; // Negative Z is forward

    ballRef.current.setLinvel({ x: 0, y: velY, z: velZ }, true);
    // Suppress angular velocity for a clean start
    ballRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);

    if (pointerRef.current) pointerRef.current.visible = false;
    if (textRef.current) textRef.current.visible = false;
  };

  useFrame((state) => {
    if (launched) return;
    const time = state.clock.getElapsedTime();
    // Sweep between 15° and 75° smoothly
    const currentAngle = 45 + Math.sin(time * 2) * 30;
    angleRef.current = currentAngle;
    
    if (pointerRef.current) {
       // A positive X rotation bends it upwards from the -Z orientation
       pointerRef.current.rotation.x = (currentAngle * Math.PI) / 180;
    }
    if (textRef.current) {
       textRef.current.text = `Angle: ${Math.round(currentAngle)}°`;
    }
  });

  return (
    <group>
      <Player position={[0, 2, 8]} />
      
      {/* Floor */}
      <RigidBody type="fixed" position={[0, -0.5, 0]}>
        <Box args={[16, 1, 24]} material-color="#8D5524" />
      </RigidBody>

      {/* Launcher UI Area */}
      <RigidBody type="fixed" position={[0, -0.4, 5]}>
        <Box args={[4, 0.2, 4]} material-color="#FEDD00" />
      </RigidBody>

      {/* Dynamic Projectile Angle Indicator */}
      {!launched && (
        <>
          <group position={[0, 0.2, 5]} ref={pointerRef}>
            {/* Arrow shaft pointing to -Z by default */}
            <Cylinder args={[0.04, 0.04, 2.5]} position={[0, 0, -1.25]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#FEDD00" emissive="#FEDD00" emissiveIntensity={0.5} />
            </Cylinder>
            {/* Arrow Head */}
            <Cone args={[0.15, 0.4]} position={[0, 0, -2.5]} rotation={[-Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#FEDD00" />
            </Cone>
          </group>
          {/* Angle Display Text hovering nearby */}
          <Text depthOffset={-2} ref={textRef} position={[-2.5, 1.5, 5]} color="white" fontSize={0.6}>
            Angle: 45°
          </Text>
        </>
      )}

      {/* Projectile Ball */}
      <RigidBody ref={ballRef} position={[0, 0.2, 5]} colliders="ball" mass={1} restitution={0.8}>
         <Sphere args={[0.5, 32, 32]} onClick={launchBall} castShadow>
           <meshStandardMaterial color="#EF3340" />
         </Sphere>
      </RigidBody>

      {/* Target Wall */}
      <RigidBody type="fixed" position={[0, 4, -8]}>
        <Box args={[4, 8, 1]} material-color="#009A44" />
      </RigidBody>
    </group>
  );
}
