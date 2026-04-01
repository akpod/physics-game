import { RigidBody } from '@react-three/rapier';
import { Box, Grid, Cone, Cylinder, Dodecahedron, Sphere } from '@react-three/drei';
import { useMemo } from 'react';

// Reusable Low-Poly Tree
const Tree = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => (
  <group position={position} scale={scale}>
    {/* Trunk */}
    <Cylinder args={[0.2, 0.4, 2]} position={[0, 1, 0]} castShadow receiveShadow>
      <meshStandardMaterial color="#5C4033" roughness={0.9} />
    </Cylinder>
    {/* Leaves - layered cones for a stylized pine/acacia look */}
    <Cone args={[1.5, 2.5, 5]} position={[0, 2.5, 0]} castShadow>
      <meshStandardMaterial color="#2E8B57" roughness={0.8} />
    </Cone>
    <Cone args={[1.2, 2, 5]} position={[0, 3.5, 0]} castShadow>
      <meshStandardMaterial color="#3CB371" roughness={0.8} />
    </Cone>
    <Cone args={[0.8, 1.5, 5]} position={[0, 4.5, 0]} castShadow>
      <meshStandardMaterial color="#228B22" roughness={0.8} />
    </Cone>
  </group>
);

// Reusable Low-Poly Rock
const Rock = ({ position, scale = 1, rotation }: { position: [number, number, number], scale?: number, rotation: [number, number, number] }) => (
  <Dodecahedron args={[1]} position={position} scale={scale} rotation={rotation} castShadow receiveShadow>
    <meshStandardMaterial color="#808080" roughness={1} />
  </Dodecahedron>
);

// Reusable Distant Hill
const Hill = ({ position, scale }: { position: [number, number, number], scale: [number, number, number] }) => (
  <Sphere args={[1, 16, 16]} position={position} scale={scale} receiveShadow>
    <meshStandardMaterial color="#6B8E23" roughness={1} /> {/* Olive/Grass green */}
  </Sphere>
);

export default function PhysicsWorld() {
  // Generate random positions once using useMemo so they don't jump around on re-renders
  const objects = useMemo(() => {
    const trees = [];
    const rocks = [];
    const hills = [];

    // Distant Hills (forming a valley boundary)
    for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2;
        const radius = 60 + Math.random() * 20; // 60 to 80 units out
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        hills.push({
            pos: [x, -5, z] as [number, number, number],
            scale: [15 + Math.random() * 10, 8 + Math.random() * 10, 15 + Math.random() * 10] as [number, number, number]
        });
    }

    // Scatter Trees and Rocks (avoiding the playable center)
    for (let i = 0; i < 60; i++) {
      const x = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      
      // Keep the center (playable area) clear of obstacles
      if (Math.abs(x) < 8 && Math.abs(z) < 25) continue;

      if (Math.random() > 0.4) {
          trees.push({ pos: [x, 0, z] as [number, number, number], scale: 0.5 + Math.random() * 1 });
      } else {
          rocks.push({ 
              pos: [x, 0, z] as [number, number, number], 
              scale: 0.5 + Math.random() * 1.5,
              rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number]
          });
      }
    }
    
    return { trees, rocks, hills };
  }, []);

  return (
    <group>
      {/* Ground */}
      <RigidBody type="fixed" restitution={0.2} friction={1}>
        <Box args={[140, 1, 140]} position={[0, -0.5, 0]} receiveShadow>
          <meshStandardMaterial color="#8D6238" /> {/* Earthy Brown */}
        </Box>
      </RigidBody>
      
      {/* Visual Grid for speed reference */}
      <Grid position={[0, 0.01, 0]} args={[100, 100]} cellColor="#FEDD00" sectionColor="#009A44" fadeDistance={50} />

      {/* Render the generated beautiful terrain features */}
      {objects.hills.map((hill, i) => <Hill key={`h-${i}`} position={hill.pos} scale={hill.scale} />)}
      {objects.trees.map((tree, i) => <Tree key={`t-${i}`} position={tree.pos} scale={tree.scale} />)}
      {objects.rocks.map((rock, i) => <Rock key={`r-${i}`} position={rock.pos} scale={rock.scale} rotation={rock.rot} />)}

    </group>
  );
}
