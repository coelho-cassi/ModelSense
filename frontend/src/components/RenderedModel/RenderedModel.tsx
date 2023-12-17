import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Layer from "./Layer";
import Neuron from "./Neuron";

const RenderedModel = ({ layers, hiddenLayers, nodes }) => {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(null);
  const spacing = 1;
  const totalWidth = layers * spacing;
  const sphereRadius = 0.2;

  // Function to handle clicking on a layer
  const handleLayerClick = (layerIndex) => {
    setSelectedLayerIndex((prevSelectedLayerIndex) =>
      prevSelectedLayerIndex === layerIndex ? null : layerIndex
    );
  };

  // Function to calculate the rotation for each layer
  const calculateLayerRotationY = (layerIndex) => {
    if (selectedLayerIndex === null) return 0; // No layer selected, no rotation
    if (layerIndex < selectedLayerIndex) return -Math.PI / 6; // Rotate previous layers to the left
    if (layerIndex > selectedLayerIndex) return Math.PI / 6; // Rotate next layers to the right
    return 0; // Selected layer does not rotate
  };

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
        const maxNeuronsPerRow = 9;
        const neuronYSpacing = 0.5;
        const neuronZSpacing = 0.5;

        return (
          <group
            key={layerIndex}
            position={[xPos, 0, 0]}
            rotation={[0, calculateLayerRotationY(layerIndex), 0]}
            onClick={() => handleLayerClick(layerIndex)}
          >
            <Layer
              xPos={xPos}
              layerIndex={layerIndex}
              getColorForLayer={getColorForLayer}
            />

            {Array.from({ length: nodeCount }).map((_, nodeIndex) => {
              const rowNumber = Math.floor(nodeIndex / maxNeuronsPerRow);
              const columnNumber = nodeIndex % maxNeuronsPerRow;
              const neuronXPos = layerXPos + 0.1 + sphereRadius;
              const neuronStartZPos = 2.0;
              const neuronZPos =
                neuronStartZPos - columnNumber * neuronZSpacing;
              const neuronStartYPos = 2.0;
              const neuronYPos = neuronStartYPos - rowNumber * neuronYSpacing;

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
          </group>
        );
      })}

      <OrbitControls />
    </Canvas>
  );
};

export default RenderedModel;
