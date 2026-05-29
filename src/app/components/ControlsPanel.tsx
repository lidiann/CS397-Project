import React from "react";

// Define the shape types
export type ShapeType = "cube" | "sphere" | "cylinder" | "cone" | "torus" | "square2d" | "circle2d";

// Define the properties this component expects to receive
interface ControlsPanelProps {
  lightOn: boolean;
  setLightOn: (val: boolean) => void;
  showRays: boolean;
  setShowRays: (val: boolean) => void;
  shape: ShapeType;
  setShape: (val: ShapeType) => void;
  positionX: number;
  setPositionX: (val: number) => void;
  positionY: number;
  setPositionY: (val: number) => void;
  size: number;
  setSize: (val: number) => void;
}

export default function ControlsPanel(props: ControlsPanelProps) {
  const { lightOn, setLightOn, showRays, setShowRays, shape, setShape, positionX, setPositionX, positionY, setPositionY, size, setSize } = props;

  return (
    <div className="w-full md:w-80 p-8 bg-slate-900 border-r border-slate-800 flex flex-col gap-6 shadow-2xl z-10 overflow-y-auto">
      <div>
        <h1 className="text-2xl font-bold text-blue-400 mb-2">Shadow Lab</h1>
        <p className="text-sm text-slate-400">Investigate how light and objects interact.</p>
      </div>

      {/* Light Controls */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-slate-300">Light Controls</label>
        <div className="flex gap-2">
          <button 
            onClick={() => setLightOn(!lightOn)}
            className={`flex-1 py-2 px-2 rounded-md font-bold transition-colors ${
              lightOn ? "bg-yellow-500 text-yellow-950" : "bg-slate-700 text-slate-400"
            }`}
          >
            {lightOn ? "Light OFF" : "Light ON"}
          </button>
          <button 
            onClick={() => setShowRays(!showRays)}
            disabled={!lightOn}
            className={`flex-1 py-2 px-2 rounded-md font-bold transition-colors ${
              showRays && lightOn ? "bg-amber-400 text-amber-950" : "bg-slate-800 text-slate-500"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {showRays ? "Hide Rays" : "Show Rays"}
          </button>
        </div>
      </div>

      {/* Shape Dropdown */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-slate-300">Object Shape</label>
        <select 
          value={shape}
          onChange={(e) => setShape(e.target.value as ShapeType)}
          className="w-full py-2 px-3 bg-slate-800 text-white rounded-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <optgroup label="3D Shapes">
            <option value="cube">Cube</option>
            <option value="sphere">Sphere</option>
            <option value="cylinder">Cylinder</option>
            <option value="cone">Cone</option>
            <option value="torus">Torus (Donut)</option>
          </optgroup>
          <optgroup label="2D Shapes">
            <option value="square2d">2D Square</option>
            <option value="circle2d">2D Circle</option>
          </optgroup>
        </select>
      </div>

      {/* Horizontal Position Slider */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-slate-300 flex justify-between">
          <span>Distance</span>
        </label>
        <input 
          type="range" min="-3" max="3" step="0.1" 
          value={positionX} onChange={(e) => setPositionX(parseFloat(e.target.value))}
          className="accent-blue-500"
        />
      </div>

      {/* Vertical Position Slider */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-slate-300 flex justify-between">
          <span>Height</span>
        </label>
        <input 
          type="range" min="-2" max="3" step="0.1" 
          value={positionY} onChange={(e) => setPositionY(parseFloat(e.target.value))}
          className="accent-blue-500"
        />
      </div>

      {/* Size Slider */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-slate-300">Object Size</label>
        <input 
          type="range" min="0.5" max="2.5" step="0.1" 
          value={size} onChange={(e) => setSize(parseFloat(e.target.value))}
          className="accent-blue-500"
        />
      </div>
    </div>
  );
}