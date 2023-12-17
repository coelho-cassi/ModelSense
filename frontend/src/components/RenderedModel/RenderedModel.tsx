import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Layer from "./Layer";
import Neuron from "./Neuron";

const RenderedModel: React.FC<{
  layers: number;
  hiddenLayers: number;
  nodes: number[];
  //top3: number[][];
}> = ({ layers, hiddenLayers, nodes }) => {
  const spacing = 0.75;
  const totalWidth = layers * spacing;
  const sphereRadius = 0.2; // Smaller radius for the spheres

  // Function to determine color for Slim3DSquares based on layer index
  const getColorForLayer = (layerIndex: number) => {
    if (layerIndex === 0) return "#E0B0FF"; // Blue for input layer
    if (layerIndex === layers - 1) return "#FF4500"; // Green for output layer
    return "#FFD700"; // White for hidden layers
  };

  // Function to determine color for Spheres
  const getColorForSphere = (layerIndex: number, nodeIndex: number) => {
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
        const xPos = layerIndex * spacing; // Position layers horizontally
        const layerXPos = layerIndex * spacing;

        return (
          <React.Fragment key={layerIndex}>
            <Layer
              xPos={xPos}
              layerIndex={layerIndex}
              getColorForLayer={getColorForLayer}
            />

            {Array.from({ length: nodeCount }).map((_, nodeIndex) => {
              const neuronYPos = 2.3 - (nodeIndex + 0.5) * sphereRadius * 2;
              const neuronZPos = 2;
              const neuronXPos = layerXPos + 0.1 + sphereRadius;

              return (
                <Neuron
                  key={nodeIndex}
                  nodeId={nodeIndex}
                  xPos={neuronXPos}
                  yPos={neuronYPos}
                  zPos={neuronZPos}
                  sphereRadius={sphereRadius}
                  getColorForSphere={getColorForSphere}
                  layerIndex={layerIndex}
                />
              );
            })}
          </React.Fragment>
        );
      })}

      <OrbitControls />
    </Canvas>
  );
};

export default RenderedModel;
