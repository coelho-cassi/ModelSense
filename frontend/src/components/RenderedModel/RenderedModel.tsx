import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Layer from "./Layer";
import Neuron from "./Neuron";

const RenderedModel: React.FC<{
  layers: number;
  hiddenLayers: number;
  nodes: number[];
  top3: number[][];
}> = ({ layers, hiddenLayers, nodes, top3 }) => {
  const spacing = 0.75;
  const totalWidth = layers * spacing;
  const sphereRadius = 0.1; // Smaller radius for the spheres
  const sphereColor = "#98FB98"; // Uniform color for all spheres

  // Function to determine color for Slim3DSquares based on layer index
  const getColorForLayer = (layerIndex: number) => {
    if (layerIndex === 0) return "#E0B0FF"; // Blue for input layer
    if (layerIndex === layers - 1) return "#FF4500"; // Green for output layer
    return "#FFD700"; // White for hidden layers
  };

  // Function to determine color for Spheres
  const getColorForSphere = (layerIndex: number, nodeIndex: number) => {
    if (layerIndex < hiddenLayers && top3[layerIndex].includes(nodeIndex)) {
      return "#98FB98"; // Highlight color for top nodes
    }
    return "#98FB98"; // Regular color
  };

  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      camera={{
        position: [totalWidth / 2, 0, totalWidth * 2], // Side view, adjust z for distance from layers
        fov: 100,
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Render Layers in reverse order */}
      {nodes.map((nodeCount, layerIndex) => {
        const yPos = (layers - 1 - layerIndex) * spacing;
        const xPos = layerIndex * spacing; // Position layers horizontally

        // Determine if the layer is hidden
        const isHiddenLayer = layerIndex > 0 && layerIndex < layers - 1;

        return (
          <React.Fragment key={layerIndex}>
            <Layer
              xPos={xPos}
              layerIndex={layerIndex}
              getColorForLayer={getColorForLayer}
            />

            {/* Conditionally render Neurons for this Layer */}
            {isHiddenLayer
              ? top3[layerIndex - 1].map((nodeId, nodeIndex) => (
                  <Neuron
                    key={nodeId}
                    nodeId={nodeId}
                    nodeIndex={nodeIndex}
                    yPos={yPos}
                    sphereRadius={sphereRadius}
                    getColorForSphere={getColorForSphere}
                    layerIndex={layerIndex}
                  />
                ))
              : Array.from({ length: nodeCount }).map((_, nodeIndex) => (
                  <Neuron
                    key={nodeIndex}
                    nodeId={nodeIndex}
                    nodeIndex={nodeIndex}
                    yPos={yPos}
                    sphereRadius={sphereRadius}
                    getColorForSphere={getColorForSphere}
                    layerIndex={layerIndex}
                  />
                ))}
          </React.Fragment>
        );
      })}

      <OrbitControls />
    </Canvas>
  );
};
export default RenderedModel;
