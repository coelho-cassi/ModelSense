import React from "react";
import RenderedModel from "../RenderedModel/RenderedModel";

interface GraphViewingWindowProps {
  className?: string;
  layers: number;
  hiddenLayers: number;
  nodes: number[];
}

const GraphViewingWindow: React.FC<GraphViewingWindowProps> = ({
  className,
  layers,
  hiddenLayers,
  nodes,
}) => {
  return (
    <div className={`relative w-100 h-128 ${className}`}>
      {/* White Rectangle (Bottom) */}
      <div className="absolute inset-0 bg-secondary_bg rounded-lg opacity-80 shadow"></div>

      {/* Rendered Model */}
      <div className="absolute inset-0">
        <RenderedModel
          layers={layers}
          hiddenLayers={hiddenLayers}
          nodes={nodes}
        />
      </div>
    </div>
  );
};

export default GraphViewingWindow;
