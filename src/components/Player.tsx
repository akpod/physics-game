import { useFrame } from '@react-three/fiber';
import { useKeyboardControls, Box, Sphere, Capsule } from '@react-three/drei';
import { RigidBody, CapsuleCollider, useRapier } from '@react-three/rapier';
import { useRef } from 'react';
import * as THREE from 'three';
import { useGameStore } from '../store/gameStore';
import { useMobileControls } from '../store/mobileControlsStore';

export default function Player({ position = [0, 2, 0] }: { position?: [number, number, number] }) {
  const bodyRef = useRef<any>(null);
  const visualRef = useRef<THREE.Group>(null);
  
  // Limb Refs for animation
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);

  const [, get] = useKeyboardControls();
  
  // Camera smoothing vectors
  const smoothedCameraPosition = useRef(new THREE.Vector3(0, 5, 10));
  const smoothedCameraTarget = useRef(new THREE.Vector3(0, 0, 0));

  // Animation states
  const currentRotation = useRef(0);

  // New refs for interaction
  const { rapier, world } = useRapier();
  const grabbedBodyRef = useRef<any>(null);
  const wasInteractPressed = useRef(false);

  // We use a larger mannequin size
  const MANNEQUIN_SCALE = 1.2;

  const gravityScale = useGameStore(s => s.gravityScale) || 1.0;

  useFrame((state, delta) => {
    if (!bodyRef.current || !visualRef.current) return;
    
    // 1. Handle Movement Input (Velocity-based)
    const keyboardInput = get() as any;
    const mobileInput = useMobileControls.getState();
    
    const forward = keyboardInput.forward || mobileInput.forward;
    const backward = keyboardInput.backward || mobileInput.backward;
    const left = keyboardInput.left || mobileInput.left;
    const right = keyboardInput.right || mobileInput.right;
    const jump = keyboardInput.jump || mobileInput.jump;
    const run = keyboardInput.run || mobileInput.run;
    const interact = keyboardInput.interact || mobileInput.interact;
    const wave = keyboardInput.wave;
    const point = keyboardInput.point;
    
    // Base speed and sprint multiplier
    const speed = run ? 12.0 : 6.0; 
    const currentVel = bodyRef.current.linvel();
    
    // Handle Rotation
    if (left) currentRotation.current += delta * 3;
    if (right) currentRotation.current -= delta * 3;

    let moveSpeed = 0;
    if (forward) moveSpeed = speed;
    if (backward) moveSpeed = -speed;
    
    // Instead of forcing velocity every frame, we apply an impulse to reach the target velocity.
    // This allows Rapier's friction to naturally slow the player down when there's no input.
    if (moveSpeed !== 0) {
        const targetX = Math.sin(currentRotation.current) * moveSpeed;
        const targetZ = Math.cos(currentRotation.current) * moveSpeed;

        const impulseX = (targetX - currentVel.x) * bodyRef.current.mass() * 0.4;
        const impulseZ = (targetZ - currentVel.z) * bodyRef.current.mass() * 0.4;
        
        bodyRef.current.applyImpulse({ x: impulseX, y: 0, z: impulseZ }, true);
    }

    // Jumping
    if (jump && Math.abs(currentVel.y) < 0.1) {
        bodyRef.current.applyImpulse({ x: 0, y: 10 * bodyRef.current.mass(), z: 0 }, true);
        import('../audio/AudioManager').then(m => m.audioManager.playJumpSound());
    }

    // 1.5 Handle Interaction (Pick up / Drop)
    if (interact && !wasInteractPressed.current) {
        if (!grabbedBodyRef.current) {
            const pos = bodyRef.current.translation();
            const dir = { x: Math.sin(currentRotation.current), y: 0, z: Math.cos(currentRotation.current) };
            const rayStart = { x: pos.x + dir.x * 1.0, y: pos.y + 1.0, z: pos.z + dir.z * 1.0 };
            
            const ray = new rapier.Ray(rayStart, dir);
            const hit = world.castRay(ray, 3.0, true);
            
            if (hit && hit.collider) {
                const parent = hit.collider.parent();
                const isDynamic = parent && parent.bodyType() === rapier.RigidBodyType.Dynamic;
                const isPickable = parent && parent.userData && (parent.userData as Record<string, any>).pickable;
                
                if (isDynamic || isPickable) {
                    grabbedBodyRef.current = parent;
                    parent.setBodyType(rapier.RigidBodyType.KinematicPositionBased, true);
                }
            }
        } else {
            // Drop - place the object cleanly onto the ground
            const pos = bodyRef.current.translation();
            const handPos = {
                x: pos.x + Math.sin(currentRotation.current) * 1.5,
                y: pos.y + 1.2,
                z: pos.z + Math.cos(currentRotation.current) * 1.5
            };
            const dropRay = new rapier.Ray(handPos, { x: 0, y: -1, z: 0 });
            const dropHit = world.castRay(dropRay, 5.0, true);
            
            if (dropHit && dropHit.collider) {
                // Drop hit - place object right above hit surface. We assume object radius/height ~ 0.5.
                const toi = (dropHit as any).toi || (dropHit as any).timeOfImpact || 1.0;
                grabbedBodyRef.current.setTranslation({ x: handPos.x, y: handPos.y - toi + 0.5, z: handPos.z }, true);
            }
            
            grabbedBodyRef.current.setBodyType(rapier.RigidBodyType.Dynamic, true);
            grabbedBodyRef.current = null;
        }
    }
    wasInteractPressed.current = interact;

    // Update grabbed object position
    if (grabbedBodyRef.current) {
        const pos = bodyRef.current.translation();
        const handPos = {
            x: pos.x + Math.sin(currentRotation.current) * 1.5,
            y: pos.y + 1.2,
            z: pos.z + Math.cos(currentRotation.current) * 1.5
        };
        grabbedBodyRef.current.setNextKinematicTranslation(handPos);
        
        const currentEuler = new THREE.Euler(0, currentRotation.current, 0);
        const currentQuat = new THREE.Quaternion().setFromEuler(currentEuler);
        grabbedBodyRef.current.setNextKinematicRotation(currentQuat);
    }

    // 2. Handle Visual Rotation & Walking Animation
    const isMoving = Math.abs(moveSpeed) > 0.1;

    // Base torso tilt
    visualRef.current.rotation.x = THREE.MathUtils.lerp(visualRef.current.rotation.x, (isMoving && run) ? 0.3 : (isMoving ? 0.15 : 0), delta * 10);

    const isHoldingObject = !!grabbedBodyRef.current;

    if (wave) {
       // Wave animation
       const time = state.clock.getElapsedTime();
       if (rightArmRef.current) rightArmRef.current.rotation.x = Math.sin(time * 10) * 0.5;
       if (rightArmRef.current) rightArmRef.current.rotation.z = -2.0; 
       
       if (leftArmRef.current) leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, delta * 10);
       if (leftArmRef.current) leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0, delta * 10);

       // Reset legs or play walking
       if (isMoving) {
           const swing = Math.sin(state.clock.getElapsedTime() * (run ? 20 : 12)) * (run ? 0.8 : 0.4);
           if (leftLegRef.current) leftLegRef.current.rotation.x = -swing;
           if (rightLegRef.current) rightLegRef.current.rotation.x = swing;
       } else {
           if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, delta * 10);
           if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, delta * 10);
       }
    } else if (point) {
       // Point animation
       if (rightArmRef.current) rightArmRef.current.rotation.x = -Math.PI / 2; // Point forward
       if (rightArmRef.current) rightArmRef.current.rotation.z = 0;
       
       if (leftArmRef.current) leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, delta * 10);
       if (leftArmRef.current) leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0, delta * 10);

       if (isMoving) {
           const swing = Math.sin(state.clock.getElapsedTime() * (run ? 20 : 12)) * (run ? 0.8 : 0.4);
           if (leftLegRef.current) leftLegRef.current.rotation.x = -swing;
           if (rightLegRef.current) rightLegRef.current.rotation.x = swing;
       } else {
           if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, delta * 10);
           if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, delta * 10);
       }
    } else if (isHoldingObject) {
       // Holding object animation
       if (rightArmRef.current) rightArmRef.current.rotation.x = -1.5;
       if (rightArmRef.current) rightArmRef.current.rotation.z = 0;
       if (leftArmRef.current) leftArmRef.current.rotation.x = -1.5;
       if (leftArmRef.current) leftArmRef.current.rotation.z = 0;

       if (isMoving) {
           const swing = Math.sin(state.clock.getElapsedTime() * (run ? 20 : 12)) * (run ? 0.8 : 0.4);
           if (leftLegRef.current) leftLegRef.current.rotation.x = -swing;
           if (rightLegRef.current) rightLegRef.current.rotation.x = swing;
       } else {
           if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, delta * 10);
           if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, delta * 10);
       }
    } else {
       // Normal walking/idle
       if (isMoving) {
           const time = state.clock.getElapsedTime();
           const runFrequency = run ? 20 : 12; // Swing faster if running
           const runAmplitude = run ? 0.8 : 0.4; // Swing wider if running
           const swing = Math.sin(time * runFrequency) * runAmplitude;
           
           if (leftArmRef.current) leftArmRef.current.rotation.x = swing;
           if (rightArmRef.current) rightArmRef.current.rotation.x = -swing;
           
           // Ensure arm z is 0
           if (leftArmRef.current) leftArmRef.current.rotation.z = 0;
           if (rightArmRef.current) rightArmRef.current.rotation.z = 0;

           if (leftLegRef.current) leftLegRef.current.rotation.x = -swing;
           if (rightLegRef.current) rightLegRef.current.rotation.x = swing;
       } else {
           // Smoothly reset limbs
           if (leftArmRef.current) {
               leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, delta * 10);
               leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0, delta * 10);
           }
           if (rightArmRef.current) {
               rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, delta * 10);
               rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0, delta * 10);
           }
           if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, delta * 10);
           if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, delta * 10);
       }
    }

    // Smoothly rotate the character mesh to the target rotation
    visualRef.current.rotation.y = currentRotation.current;

    // 3. Handle Third-Person Camera (Locked to Player Rotation)
    const pos = bodyRef.current.translation();
    const playerPosition = new THREE.Vector3(pos.x, pos.y, pos.z);
    
    // Move the camera higher and further back based on speed
    const cameraZOffset = run ? -10 : -8;
    const cameraOffset = new THREE.Vector3(0, 4, cameraZOffset); 
    
    // Rotate the camera offset so it always stays rigidly behind the player's back
    cameraOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), currentRotation.current);
    
    const idealCameraPos = playerPosition.clone().add(cameraOffset);

    smoothedCameraPosition.current.lerp(idealCameraPos, delta * 5);
    smoothedCameraTarget.current.lerp(playerPosition.clone().add(new THREE.Vector3(0, 1.5, 0)), delta * 5); // Look slightly above ground

    state.camera.position.copy(smoothedCameraPosition.current);
    state.camera.lookAt(smoothedCameraTarget.current);
  });

  // Colors mapping for "Real Human" style skin and clothes
  const skinColor = "#5C3A21"; // African skin tone
  const shirtColor = "#009A44"; // Green shirt (Ethiopian flag)
  const pantsColor = "#FED100"; // Yellow pants (Ethiopian flag)
  const shoeColor = "#EF3340"; // Red shoes (Ethiopian flag)

  return (
    <RigidBody 
      ref={bodyRef} 
      position={position} 
      restitution={0.0} 
      friction={2.0}
      gravityScale={gravityScale}
      enabledRotations={[false, false, false]} // Keep upright rigidly
    >
      <CapsuleCollider args={[MANNEQUIN_SCALE * 0.7, MANNEQUIN_SCALE * 0.3]} />
      
      {/* Realistic Humanoid Mannequin */}
      <group ref={visualRef} scale={MANNEQUIN_SCALE} position={[0, -0.6, 0]}>
         {/* Head */}
         <Sphere args={[0.25, 32, 32]} position={[0, 1.4, 0]} castShadow>
            <meshStandardMaterial color={skinColor} roughness={0.4} />
         </Sphere>
         {/* Neck */}
         <Capsule args={[0.08, 0.1]} position={[0, 1.15, 0]} castShadow>
            <meshStandardMaterial color={skinColor} roughness={0.4} />
         </Capsule>
         
         {/* Torso (Chest) */}
         <Box args={[0.55, 0.6, 0.3]} position={[0, 0.8, 0]} castShadow>
            <meshStandardMaterial color={shirtColor} roughness={0.8} />
         </Box>
         
         {/* Left Arm (Pivoting at shoulder) */}
         <group ref={leftArmRef} position={[-0.35, 1.1, 0]}>
            <group position={[0, -0.3, 0]} rotation={[0, 0, 0.15]}>
                {/* Upper Arm */}
                <Capsule args={[0.1, 0.3]} position={[0, -0.2, 0]} castShadow>
                   <meshStandardMaterial color={shirtColor} />
                </Capsule>
                <Capsule args={[0.09, 0.3]} position={[0, -0.6, 0]} castShadow>
                   <meshStandardMaterial color={skinColor} />
                </Capsule>
                {/* Hand */}
                <Sphere args={[0.11, 16, 16]} position={[0, -0.85, 0]} castShadow>
                   <meshStandardMaterial color={skinColor} />
                </Sphere>
            </group>
         </group>

         {/* Right Arm (Pivoting at shoulder) */}
         <group ref={rightArmRef} position={[0.35, 1.1, 0]}>
            <group position={[0, -0.3, 0]} rotation={[0, 0, -0.15]}>
                <Capsule args={[0.1, 0.3]} position={[0, -0.2, 0]} castShadow>
                   <meshStandardMaterial color={shirtColor} />
                </Capsule>
                <Capsule args={[0.09, 0.3]} position={[0, -0.6, 0]} castShadow>
                   <meshStandardMaterial color={skinColor} />
                </Capsule>
                {/* Hand */}
                <Sphere args={[0.11, 16, 16]} position={[0, -0.85, 0]} castShadow>
                   <meshStandardMaterial color={skinColor} />
                </Sphere>
            </group>
         </group>

         {/* Pelvis */}
         <Box args={[0.55, 0.2, 0.3]} position={[0, 0.4, 0]} castShadow>
            <meshStandardMaterial color={pantsColor} />
         </Box>

         {/* Left Leg (Pivoting at hip) */}
         <group ref={leftLegRef} position={[-0.15, 0.35, 0]}>
            <group position={[0, -0.35, 0]}>
                <Capsule args={[0.12, 0.4]} position={[0, 0, 0]} castShadow>
                   <meshStandardMaterial color={pantsColor} />
                </Capsule>
                {/* Shoe */}
                <Box args={[0.15, 0.15, 0.25]} position={[0, -0.3, 0.05]} castShadow>
                   <meshStandardMaterial color={shoeColor} />
                </Box>
            </group>
         </group>

         {/* Right Leg (Pivoting at hip) */}
         <group ref={rightLegRef} position={[0.15, 0.35, 0]}>
            <group position={[0, -0.35, 0]}>
                <Capsule args={[0.12, 0.4]} position={[0, 0, 0]} castShadow>
                   <meshStandardMaterial color={pantsColor} />
                </Capsule>
                <Box args={[0.15, 0.15, 0.25]} position={[0, -0.3, 0.05]} castShadow>
                   <meshStandardMaterial color={shoeColor} />
                </Box>
            </group>
         </group>
      </group>
    </RigidBody>
  );
}
