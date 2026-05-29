"use client";

import { useState } from "react";
import ControlsPanel, { ShapeType } from "../app/components/ControlsPanel";
import SimulationScene from "../app/components/SimulationScene";

export default function ShadowSimulation() {
  // This state is the "source of truth" for the entire application
  const [lightOn, setLightOn] = useState(true);
  const [showRays, setShowRays] = useState(false);
  const [shape, setShape] = useState<ShapeType>("cube");
  const [size, setSize] = useState(1);
  const [positionX, setPositionX] = useState(0); 
  const [positionY, setPositionY] = useState(0);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-950 text-white font-sans">
      
      {/* Sidebar Controls */}
      <ControlsPanel 
        lightOn={lightOn} setLightOn={setLightOn}
        showRays={showRays} setShowRays={setShowRays}
        shape={shape} setShape={setShape}
        positionX={positionX} setPositionX={setPositionX}
        positionY={positionY} setPositionY={setPositionY}
        size={size} setSize={setSize}
      />

      {/* 3D Visualizer */}
      <SimulationScene 
        lightOn={lightOn}
        showRays={showRays}
        shape={shape}
        positionX={positionX}
        positionY={positionY}
        size={size}
      />

    </div>
  );
}