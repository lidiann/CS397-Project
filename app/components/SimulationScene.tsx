import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Sphere, Cylinder, Cone, Torus, Plane, Circle, Line } from "@react-three/drei";
import { DoubleSide } from "three";
import { ShapeType } from "./ControlsPanel";

interface SimulationSceneProps {
  lightOn: boolean;
  showRays: boolean;
  shape: ShapeType;
  positionX: number;
  positionY: number;
  size: number;
}

export default function SimulationScene({ lightOn, showRays, shape, positionX, positionY, size }: SimulationSceneProps) {
  // Light Math
  const lightOriginX = -5.5;
  const wallX = 6;
  const lightAngle = 0.55; 
  const coneSpreadY = Math.tan(lightAngle) * (wallX - lightOriginX);

  const renderShape = () => {
    const material = <meshStandardMaterial color="#3b82f6" roughness={0.3} side={DoubleSide} />;
    const scale = [size, size, size] as const;
    const pos = [positionX, positionY, 0] as const;

    switch (shape) {
      case "cube": return <Box position={pos} scale={scale} castShadow>{material}</Box>;
      case "sphere": return <Sphere position={pos} scale={scale} castShadow>{material}</Sphere>;
      case "cylinder": return <Cylinder position={pos} scale={scale} castShadow>{material}</Cylinder>;
      case "cone": return <Cone position={pos} scale={scale} castShadow>{material}</Cone>;
      case "torus": return <Torus position={pos} scale={scale} args={[0.6, 0.2, 16, 64]} castShadow>{material}</Torus>;
      case "square2d": return <Plane position={pos} scale={scale} rotation={[0, Math.PI / 2, 0]} castShadow>{material}</Plane>;
      case "circle2d": return <Circle position={pos} scale={scale} args={[0.8, 32]} rotation={[0, Math.PI / 2, 0]} castShadow>{material}</Circle>;
      default: return <Box position={pos} scale={scale} castShadow>{material}</Box>;
    }
  };

  return (
    <div className="flex-1 relative cursor-grab active:cursor-grabbing">
      <Canvas shadows={{ type: THREE.PCFShadowMap }} camera={{ position: [0, 4, 12], fov: 50 }}>
        <ambientLight intensity={lightOn ? 0.2 : 0.05} />

        {lightOn && (
          <spotLight
            position={[lightOriginX, 0, 0]}
            angle={lightAngle}
            penumbra={0.5}
            intensity={250}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />
        )}

        {/* Flashlight Assembly */}
        <group position={[-6, 0, 0]}>
          <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 1.2, 16]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0.2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.3, 0.6, 16]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <mesh position={[0.45, 0, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color={lightOn ? "#fbbf24" : "#475569"} />
          </mesh>
        </group>

        {/* 5-Line Ray System */}
        {lightOn && showRays && (
          <group>
            <Line points={[[lightOriginX, 0, 0], [wallX, coneSpreadY, 0]]} color="#fef08a" dashed dashSize={0.4} gapSize={0.2} lineWidth={1.5} opacity={0.3} transparent />
            <Line points={[[lightOriginX, 0, 0], [wallX, -coneSpreadY, 0]]} color="#fef08a" dashed dashSize={0.4} gapSize={0.2} lineWidth={1.5} opacity={0.3} transparent />
            <Line points={[[lightOriginX, 0, 0], [positionX - (shape.includes('2d') ? 0 : size/2), positionY + size/2.5, 0]]} color="#fef08a" dashed dashSize={0.2} gapSize={0.1} lineWidth={2} />
            <Line points={[[lightOriginX, 0, 0], [positionX - (shape.includes('2d') ? 0 : size/2), positionY, 0]]} color="#fef08a" dashed dashSize={0.2} gapSize={0.1} lineWidth={2} />
            <Line points={[[lightOriginX, 0, 0], [positionX - (shape.includes('2d') ? 0 : size/2), positionY - size/2.5, 0]]} color="#fef08a" dashed dashSize={0.2} gapSize={0.1} lineWidth={2} />
          </group>
        )}

        {/* Target Object */}
        {renderShape()}

        {/* Projection Wall */}
        <mesh position={[6, 0, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.9} />
        </mesh>

        {/* Floor */}
        <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[30, 20]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>

        <OrbitControls makeDefault maxPolarAngle={Math.PI / 1.5} minDistance={5} maxDistance={20} />
      </Canvas>
    </div>
  );
}