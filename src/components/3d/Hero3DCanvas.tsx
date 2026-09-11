"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text, Html } from "@react-three/drei";

function AbstractParticleHead() {
  const pointsRef = useRef<THREE.Points>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  // Generate particle lattice in bust / sphere profile
  const count = 750;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.35 + (Math.sin(theta * 4) * 0.15) + (Math.random() * 0.1);
      
      // Ellipsoid shape representing head/bust
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) * 1.35; // taller for bust
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.25;
      // React to pointer
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        state.pointer.y * 0.3,
        0.05
      );
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(
        pointsRef.current.rotation.y,
        state.pointer.x * 0.5 + state.clock.elapsedTime * 0.2,
        0.05
      );
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  return (
    <group position={[0, 0.1, 0]}>
      {/* Particle Bust Structure */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#ff7a1a"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Wireframe inner geometry */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          wireframe
          color="#1B6CA8"
          emissive="#5AD2F4"
          emissiveIntensity={0.8}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Orbiting Tech Rings */}
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.0, 0.015, 16, 100]} />
          <meshBasicMaterial color="#ff7a1a" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[2.3, 0.01, 16, 100]} />
          <meshBasicMaterial color="#5AD2F4" transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function FloatingStatCard({
  position,
  label,
  value,
  sub,
  color,
}: {
  position: [number, number, number];
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  const cardRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cardRef.current) {
      // Subtle tilt towards cursor
      cardRef.current.rotation.y = THREE.MathUtils.lerp(
        cardRef.current.rotation.y,
        state.pointer.x * 0.2,
        0.05
      );
      cardRef.current.rotation.x = THREE.MathUtils.lerp(
        cardRef.current.rotation.x,
        -state.pointer.y * 0.15,
        0.05
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={cardRef} position={position}>
        <Html transform distanceFactor={5.8}>
          <div
            className="w-40 p-3 rounded-xl border border-white/10 bg-black/75 backdrop-blur-md shadow-xl transition-all select-none hover:border-cyan-500/40 opacity-80 hover:opacity-100"
            style={{
              boxShadow: `0 8px 24px -8px ${color}33`,
            }}
          >
            <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 mb-0.5">
              {label}
            </div>
            <div
              className="text-sm font-bold font-heading mb-0.5"
              style={{ color }}
            >
              {value}
            </div>
            <div className="text-[10px] text-zinc-400 leading-snug">{sub}</div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

function SceneController() {
  const { camera } = useThree();

  useFrame((state) => {
    // Subtle mouse parallax camera motion
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 0.35, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, state.pointer.y * 0.25, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function Hero3DCanvas() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <SceneController />

        {/* Cinematic Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 3, 2]} intensity={2.2} color="#ff7a1a" />
        <directionalLight position={[-4, -2, -2]} intensity={1.8} color="#5AD2F4" />
        <pointLight position={[0, 4, 1]} intensity={1.5} color="#ffffff" />

        {/* Central 3D Particle Model */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <AbstractParticleHead />
        </Float>

        {/* 3D Floating Holographic Stat Cards symmetrically framing the core */}
        <FloatingStatCard
          position={[-2.3, 1.0, 0]}
          label="EXPERTISE"
          value="Full Stack & AI"
          sub="React · Next.js · Python"
          color="#ff7a1a"
        />
        <FloatingStatCard
          position={[2.3, 0.8, -0.2]}
          label="PROJECTS"
          value="5+ Built"
          sub="E-Commerce, Disaster Tech"
          color="#5AD2F4"
        />
        <FloatingStatCard
          position={[-2.1, -0.95, 0.1]}
          label="EDUCATION"
          value="CSE @ GIET"
          sub="B.Tech (2025 - 2029)"
          color="#c084fc"
        />
        <FloatingStatCard
          position={[2.2, -0.95, -0.1]}
          label="RECOGNITION"
          value="IIT Guwahati"
          sub="Summit Delegate"
          color="#38bdf8"
        />
      </Canvas>
    </div>
  );
}

export default Hero3DCanvas;
