import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import * as THREE from "three";

const NODE_COUNT = 120;
const LINK_DISTANCE = 0.48;
const DRIFT = 0.07;

const PALETTE = [
  new THREE.Color("#4a77ff"),
  new THREE.Color("#5b8aff"),
  new THREE.Color("#00cea8"),
  new THREE.Color("#f272c8"),
  new THREE.Color("#c8d4ff"),
];

const NetworkGraph = () => {
  const groupRef = useRef();
  const pointsRef = useRef();
  const linesRef = useRef();
  // Canvas sits behind the form (pointer-events: none), so track the window pointer
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const { base, positions, colors, phases, links, linePositions, lineColors } =
    useMemo(() => {
      const base = new Float32Array(NODE_COUNT * 3);
      const positions = new Float32Array(NODE_COUNT * 3);
      const colors = new Float32Array(NODE_COUNT * 3);
      const phases = new Float32Array(NODE_COUNT * 3);

      for (let i = 0; i < NODE_COUNT; i++) {
        const i3 = i * 3;
        // Wide, shallow volume so it reads well as a section background
        base[i3] = (Math.random() - 0.5) * 3.4;
        base[i3 + 1] = (Math.random() - 0.5) * 2.1;
        base[i3 + 2] = (Math.random() - 0.5) * 1.5;
        positions[i3] = base[i3];
        positions[i3 + 1] = base[i3 + 1];
        positions[i3 + 2] = base[i3 + 2];
        phases[i3] = Math.random() * Math.PI * 2;
        phases[i3 + 1] = Math.random() * Math.PI * 2;
        phases[i3 + 2] = Math.random() * Math.PI * 2;

        const c = PALETTE[i % PALETTE.length];
        colors[i3] = c.r;
        colors[i3 + 1] = c.g;
        colors[i3 + 2] = c.b;
      }

      const links = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = base[i * 3] - base[j * 3];
          const dy = base[i * 3 + 1] - base[j * 3 + 1];
          const dz = base[i * 3 + 2] - base[j * 3 + 2];
          const dist = Math.hypot(dx, dy, dz);
          if (dist < LINK_DISTANCE) links.push(i, j);
        }
      }

      const edgeCount = links.length / 2;
      return {
        base,
        positions,
        colors,
        phases,
        links,
        linePositions: new Float32Array(edgeCount * 6),
        lineColors: new Float32Array(edgeCount * 6),
      };
    }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const { x: px, y: py } = pointer.current;

    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] =
        base[i3] + Math.sin(t * 0.35 + phases[i3]) * DRIFT + px * 0.04;
      positions[i3 + 1] =
        base[i3 + 1] + Math.cos(t * 0.28 + phases[i3 + 1]) * DRIFT - py * 0.03;
      positions[i3 + 2] =
        base[i3 + 2] + Math.sin(t * 0.22 + phases[i3 + 2]) * (DRIFT * 0.7);
    }

    const edgeColor = PALETTE[0];
    for (let e = 0; e < links.length; e += 2) {
      const a = links[e] * 3;
      const b = links[e + 1] * 3;
      const li = (e / 2) * 6;

      linePositions[li] = positions[a];
      linePositions[li + 1] = positions[a + 1];
      linePositions[li + 2] = positions[a + 2];
      linePositions[li + 3] = positions[b];
      linePositions[li + 4] = positions[b + 1];
      linePositions[li + 5] = positions[b + 2];

      const dist = Math.hypot(
        positions[a] - positions[b],
        positions[a + 1] - positions[b + 1],
        positions[a + 2] - positions[b + 2]
      );
      const strength = THREE.MathUtils.clamp(1 - dist / LINK_DISTANCE, 0.15, 0.85);

      for (let k = 0; k < 2; k++) {
        const ci = li + k * 3;
        lineColors[ci] = edgeColor.r * strength;
        lineColors[ci + 1] = edgeColor.g * strength;
        lineColors[ci + 2] = edgeColor.b * strength;
      }
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        px * 0.35,
        0.04
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -py * 0.2,
        0.04
      );
      groupRef.current.rotation.z += delta * 0.015;
    }
  });

  const edgeCount = links.length / 2;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={edgeCount * 2}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
            count={edgeCount * 2}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

const NetworkCanvas = () => (
  <div className="w-full h-full absolute inset-0 pointer-events-none">
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 2.4], fov: 50, near: 0.1, far: 20 }}
      gl={{ antialias: true, alpha: true }}
    >
      <NetworkGraph />
      <Preload all />
    </Canvas>
  </div>
);

export default NetworkCanvas;
