/* GraphViewingWindow.tsx
 Acts as a container for the RenderedModel component. 
 It passes neural network-related props to RenderedModel.
*/
import React from "react";
import RenderedModel from "../RenderedModel/RenderedModel";

interface GraphViewingWindowProps {
  className?: string;
  layers: number;
  hiddenLayers: number;
  nodes: number[];
  layerTypes: string[];
  neuronGlowInfo: { [key: string]: number[] };
}

const GraphViewingWindow: React.FC<GraphViewingWindowProps> = ({
  className,
  layers,
  hiddenLayers,
  nodes,
  layerTypes,
  neuronGlowInfo,
}) => {
  console.log("GraphViewingWindow Props:", { layers, hiddenLayers, nodes }); // Debugging line
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
          layerTypes={layerTypes}
          neuronGlowInfo={neuronGlowInfo}
        />
      </div>
    </div>
  );
};

export default GraphViewingWindow;
