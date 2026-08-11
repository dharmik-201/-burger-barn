import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function Burger() {
  return (
    <group scale={1.15}>
      {/* bottom bun */}
      <mesh position={[0, -0.55, 0]} castShadow>
        <cylinderGeometry args={[1, 0.95, 0.32, 48]} />
        <meshStandardMaterial color="#d9a05b" roughness={0.55} />
      </mesh>
      {/* patty */}
      <mesh position={[0, -0.28, 0]} castShadow>
        <cylinderGeometry args={[1.02, 1.02, 0.26, 48]} />
        <meshStandardMaterial color="#5b3220" roughness={0.85} />
      </mesh>
      {/* cheese */}
      <mesh position={[0, -0.11, 0]} rotation={[0, Math.PI / 8, 0]} castShadow>
        <boxGeometry args={[1.85, 0.08, 1.85]} />
        <meshStandardMaterial color="#f2b431" roughness={0.35} />
      </mesh>
      {/* lettuce */}
      <mesh position={[0, 0.02, 0]} castShadow>
        <torusGeometry args={[0.92, 0.15, 12, 40]} />
        <meshStandardMaterial color="#4f8a3c" roughness={0.7} />
      </mesh>
      {/* tomato */}
      <mesh position={[0, 0.16, 0]} castShadow>
        <cylinderGeometry args={[0.95, 0.95, 0.12, 40]} />
        <meshStandardMaterial color="#b8281f" roughness={0.5} />
      </mesh>
      {/* top bun */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <sphereGeometry args={[1.02, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e0a75f" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[1.02, 1.02, 0.2, 48]} />
        <meshStandardMaterial color="#e0a75f" roughness={0.5} />
      </mesh>
      {/* sesame seeds */}
      {Array.from({ length: 9 }).map((_, i) => {
        const a = (i / 9) * Math.PI * 2;
        const r = 0.55 + (i % 3) * 0.12;
        return (
          <mesh key={i} position={[Math.cos(a) * r, 0.55 + Math.sqrt(Math.max(0, 1 - r * r)) * 0.85, Math.sin(a) * r]} scale={[0.07, 0.035, 0.05]}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial color="#fbe6bd" roughness={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

function Shake() {
  return (
    <group scale={1.1}>
      <mesh castShadow>
        <cylinderGeometry args={[0.62, 0.4, 1.7, 40]} />
        <meshPhysicalMaterial color="#f7e3ea" roughness={0.15} transmission={0.35} thickness={0.6} />
      </mesh>
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.56, 0.36, 1.32, 40]} />
        <meshStandardMaterial color="#8c3a2c" roughness={0.5} />
      </mesh>
      {/* cream swirl */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <sphereGeometry args={[0.55, 32, 24]} />
        <meshStandardMaterial color="#fff6ea" roughness={0.35} />
      </mesh>
      <mesh position={[0, 1.38, 0]} castShadow>
        <sphereGeometry args={[0.36, 28, 20]} />
        <meshStandardMaterial color="#fff6ea" roughness={0.35} />
      </mesh>
      <mesh position={[0, 1.64, 0]} castShadow>
        <sphereGeometry args={[0.2, 24, 18]} />
        <meshStandardMaterial color="#fff6ea" roughness={0.35} />
      </mesh>
      {/* cherry */}
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.14, 20, 16]} />
        <meshStandardMaterial color="#a81d2a" roughness={0.3} />
      </mesh>
      {/* straw */}
      <mesh position={[0.28, 1.55, 0.1]} rotation={[0.1, 0, -0.28]}>
        <cylinderGeometry args={[0.06, 0.06, 1.9, 20]} />
        <meshStandardMaterial color="#c2192b" roughness={0.3} />
      </mesh>
    </group>
  );
}

function Fry({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={[0.13, 0.95, 0.13]} />
      <meshStandardMaterial color="#eec25a" roughness={0.6} />
    </mesh>
  );
}

function MouseRig({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetY = state.pointer.x * 0.5;
    const targetX = -state.pointer.y * 0.28;
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 3);
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, delta * 3);
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene() {
  return (
    <Canvas shadows camera={{ position: [0, 0.6, 13], fov: 40 }} dpr={[1, 1.8]}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={2.1} castShadow />
      <directionalLight position={[-5, 2, -3]} intensity={0.7} color="#ffd9a1" />
      <MouseRig>
       <group scale={0.9}>
        <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.7}>
          <group position={[-1.55, -0.2, 0]}>
            <Burger />
          </group>
        </Float>
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.9}>
          <group position={[1.75, -0.35, 0.2]}>
            <Shake />
          </group>
        </Float>
        <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
          <group position={[0.2, 1.15, -0.6]}>
            <Fry position={[0, 0, 0]} rotation={[0.2, 0, 0.5]} />
            <Fry position={[0.3, -0.2, 0.2]} rotation={[-0.3, 0, -0.4]} />
          </group>
        </Float>
       </group>
      </MouseRig>
      <ContactShadows position={[0, -2.6, 0]} opacity={0.28} scale={10} blur={3} far={5} color="#5b2018" />
    </Canvas>
  );
}