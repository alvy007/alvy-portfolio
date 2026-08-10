'use client';

import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function HeroCore() {
  const group = useRef<THREE.Group>(null);
  const innerCore = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.12;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.18,
      0.035,
    );

    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -state.pointer.x * 0.12,
      0.035,
    );

    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      state.pointer.x * 0.18,
      0.025,
    );

    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      state.pointer.y * 0.12,
      0.025,
    );

    if (innerCore.current) {
      innerCore.current.rotation.x += delta * 0.18;
      innerCore.current.rotation.y -= delta * 0.22;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.7}>
        <Sphere args={[1.2, 64, 64]} scale={1.15}>
          <MeshDistortMaterial
            color="#22d3ee"
            distort={0.32}
            speed={1.7}
            roughness={0.18}
            metalness={0.42}
          />
        </Sphere>

        <mesh ref={innerCore} scale={0.78}>
          <icosahedronGeometry args={[1.15, 2]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#8b5cf6"
            emissiveIntensity={0.4}
            metalness={0.75}
            roughness={0.22}
            wireframe
          />
        </mesh>

        <mesh rotation={[0.65, 0.3, 0.15]} scale={1.85}>
          <torusGeometry args={[1.18, 0.018, 18, 160]} />
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#22d3ee"
            emissiveIntensity={1}
            metalness={0.85}
            roughness={0.18}
          />
        </mesh>

        <mesh rotation={[1.2, -0.5, 0.6]} scale={2.15}>
          <torusGeometry args={[1.12, 0.012, 18, 160]} />
          <meshStandardMaterial
            color="#c4b5fd"
            emissive="#8b5cf6"
            emissiveIntensity={0.9}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        <mesh rotation={[-0.3, 1.15, -0.7]} scale={2.45}>
          <torusGeometry args={[1.06, 0.008, 16, 150]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.75}
            transparent
            opacity={0.7}
          />
        </mesh>

        <mesh position={[2.1, 0.45, 0.2]}>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#22d3ee"
            emissiveIntensity={2.5}
          />
        </mesh>

        <mesh position={[-1.8, -1.15, 0.4]}>
          <sphereGeometry args={[0.055, 24, 24]} />
          <meshStandardMaterial
            color="#c4b5fd"
            emissive="#8b5cf6"
            emissiveIntensity={2.5}
          />
        </mesh>

        <mesh position={[0.7, 2.05, -0.2]}>
          <sphereGeometry args={[0.045, 24, 24]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#67e8f9"
            emissiveIntensity={2}
          />
        </mesh>

        <mesh scale={3.2}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#67e8f9"
            wireframe
            transparent
            opacity={0.045}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.75} />

      <directionalLight position={[4, 5, 5]} intensity={2.2} color="#dffcff" />

      <pointLight position={[-4, 1, 3]} intensity={3} color="#8b5cf6" />

      <pointLight position={[3, -3, 2]} intensity={2.4} color="#22d3ee" />

      <HeroCore />
    </>
  );
}

export function ThreeHero() {
  return (
    <div className="h-full min-h-[420px] w-full sm:min-h-[500px] lg:min-h-[640px]">
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 44,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
