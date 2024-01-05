/* RenderedModel.tsx
   Renders the 3D visualization of the neural network using React Three Fiber. 
   It includes logic for calculating positions and properties of layers and neurons, 
   as well as interactivity (like layer selection and neuron glowing)
*/

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Layer from "./Layer";
import Neuron from "./Neuron";

const RenderedModel = ({
  layers,
  hiddenLayers,
  nodes,
  layerTypes,
  neuronGlowInfo,
  selectedInsight,
  onUpdateInsights,
}) => {
  //console.log("neuronGlowInfo:", neuronGlowInfo);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(null);
  const spacing = 0.75;
  const sphereRadius = 0.2;

  const middleLayerX = ((layers - 1) * spacing) / 2;

  const offsetToCenter = -middleLayerX;

  // Function to determine if a neuron should glow
  const isGlowing = (layerIndex, nodeId) => {
    const glowLayerKey = `${layerIndex}`;
    const glowing =
      neuronGlowInfo[glowLayerKey] &&
      neuronGlowInfo[glowLayerKey].includes(nodeId);
    //console.log(`Neuron ${nodeId} (Layer ${layerIndex}): Glowing = ${glowing}`);
    return glowing;
  };

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
  const getColorForLayer = (layerIndex: number, layerTypes: string[]) => {
    const layerType = layerTypes[layerIndex];

    switch (layerType) {
      case "Conv2D":
        return "#1E90FF"; // Blue for Conv2D layers
      case "AveragePooling2D":
        return "#32CD32"; // Green for AveragePooling2D layers
      case "Flatten":
        return "#FFD700"; // Golden for Flatten layers
      case "Dense":
        return "#FF69B4"; // Pink for Dense layers
      default:
        return "#808080"; // Grey for any other layer types
    }
  };

  // Function to determine color for Spheres
  const getColorForSphere = (layerIndex: number, nodeIndex: number) => {
    return "#98FB98"; // Regular color
  };

  // Call this function when a layer is hovered
  const onLayerHover = (layerIndex) => {
    console.log(`Layer ${layerIndex} is hovered`); // TEST LINE
    if (selectedInsight === "Layer Insights") {
      console.log("Updating insights for layer:", layerIndex); // Log when updating insights TEST LINE
      // Fetch or determine the layer's information
      const layerType = layerTypes[layerIndex];
      // Call onUpdateInsights with the layer's information
      console.log("Layer type on hover:", layerType); // TEST LINE
      onUpdateInsights(layerType);
    }
  };

  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 0, layers * 1.5], fov: 75 }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[0, 10, 10]} intensity={1} />

      <group position={[offsetToCenter, 0, 0]}>
        {nodes.map((nodeCount, layerIndex) => {
          const xPos = layerIndex * spacing;
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
                nodeCount={nodeCount}
                layerIndex={layerIndex}
                getColorForLayer={() =>
                  getColorForLayer(layerIndex, layerTypes)
                }
                onLayerHover={() => onLayerHover(layerIndex)}
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
                    glowing={isGlowing(layerIndex, nodeIndex)}
                  />
                );
              })}
            </group>
          );
        })}
      </group>

      <OrbitControls enableDamping dampingFactor={0.1} />
    </Canvas>
  );
};

export default RenderedModel;
