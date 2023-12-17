import React from "react";
import { Canvas } from "@react-three/fiber";
import { RoundedBox, Sphere, Text, OrbitControls } from "@react-three/drei";

const DynamicScene: React.FC<{
  layers: number;
  hiddenLayers: number;
  nodes: number[];
  top3: number[][];
}> = ({ layers, hiddenLayers, nodes, top3 }) => {
  const spacing = 0.5;
  const totalHeight = layers * spacing;
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
        position: [5, (layers * spacing) / 2, 15 + layers * spacing],
        fov: 25,
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* Render Layers in reverse order */}
      {nodes.map((nodeCount, layerIndex) => {
        const yPos = (layers - 1 - layerIndex) * spacing;

        // Determine if the layer is hidden
        const isHiddenLayer = layerIndex > 0 && layerIndex < layers - 1;

        return (
          <React.Fragment key={layerIndex}>
            <RoundedBox
              args={[3, 2, 0.2]}
              position={[0, yPos, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <meshPhongMaterial
                color={getColorForLayer(layerIndex)}
                specular="#555555"
                shininess={30}
              />
            </RoundedBox>

            {/* Conditionally render Nodes for this Layer */}
            {isHiddenLayer
              ? top3[layerIndex - 1].map((nodeId, nodeIndex) => (
                  <React.Fragment key={nodeId}>
                    <Sphere
                      args={[sphereRadius, 32, 32]}
                      position={[-1.5 + nodeIndex * 0.75, yPos + 0.3, 0]}
                    >
                      <meshPhongMaterial
                        color={getColorForSphere(layerIndex, nodeId)}
                        specular="#555555"
                        shininess={30}
                      />
                    </Sphere>
                    <Text
                      position={[
                        -1.5 + nodeIndex * 0.75,
                        yPos + 0.3,
                        sphereRadius,
                      ]}
                      fontSize={0.1}
                      color="#ffffff"
                      textAlign="center"
                      anchorY="middle"
                    >
                      {nodeId.toString()}
                    </Text>
                  </React.Fragment>
                ))
              : Array.from({ length: nodeCount }).map((_, nodeIndex) => (
                  <Sphere
                    key={nodeIndex}
                    args={[sphereRadius, 32, 32]}
                    position={[-1.5 + nodeIndex * 0.75, yPos + 0.3, 0]}
                  >
                    <meshPhongMaterial
                      color={getColorForSphere(layerIndex, nodeIndex)}
                      specular="#555555"
                      shininess={30}
                    />
                  </Sphere>
                ))}
          </React.Fragment>
        );
      })}

      <OrbitControls />
    </Canvas>
  );
};
export default DynamicScene;
