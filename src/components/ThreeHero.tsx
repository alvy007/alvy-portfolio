'use client';

import {
  Float,
  MeshDistortMaterial,
  OrbitControls,
  Sphere,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

function FloatingObject() {
  return (
    <Float speed={2.4} rotationIntensity={1.2} floatIntensity={1.5}>
      <Sphere args={[1.45, 72, 72]} scale={1.35}>
        <MeshDistortMaterial
          color="#22d3ee"
          attach="material"
          distort={0.38}
          speed={2}
          roughness={0.22}
          metalness={0.28}
        />
      </Sphere>

      <mesh rotation={[0.7, 0.4, 0.2]} scale={2.35}>
        <torusGeometry args={[1.15, 0.015, 16, 120]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#8b5cf6"
          emissiveIntensity={0.55}
        />
      </mesh>

      <mesh rotation={[1.2, -0.8, 0.3]} scale={2.75}>
        <torusGeometry args={[1.12, 0.012, 16, 120]} />
        <meshStandardMaterial
          color="#67e8f9"
          emissive="#22d3ee"
          emissiveIntensity={0.45}
        />
      </mesh>
    </Float>
  );
}

export function ThreeHero() {
  return (
    <div className="h-[300px] w-full sm:h-[360px] md:h-[420px] lg:h-[460px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 48 }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 3, 4]} intensity={1.8} />
        <pointLight position={[-4, -2, 3]} intensity={2} color="#8b5cf6" />
        <FloatingObject />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.2}
        />
      </Canvas>
    </div>
  );
}
