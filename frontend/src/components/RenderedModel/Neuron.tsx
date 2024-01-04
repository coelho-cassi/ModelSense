/* Neuron.tsx
   Used within RenderedModel, is responsible for visualizing individual neurons of the neural network in 3D.
*/
import React from "react";
import { Sphere, Text } from "@react-three/drei";

const Neuron = ({
  nodeId,
  xPos,
  yPos,
  zPos,
  sphereRadius,
  getColorForSphere,
  layerIndex,
  glowing,
}) => {
  // Log the glowing status for debugging
  console.log(`Neuron ${nodeId} (Layer ${layerIndex}): Glowing = ${glowing}`);
  // Adjust the color or intensity based on the glowing status
  const color = glowing ? "#98FB98" : getColorForSphere(layerIndex, nodeId); // Example: Yellow for glowing

  return (
    <React.Fragment>
      <Sphere args={[sphereRadius, 16, 16]} position={[xPos, yPos, zPos]}>
        <meshStandardMaterial
          color={getColorForSphere(layerIndex, nodeId)}
          roughness={0.3}
          metalness={0.7}
          emissive={glowing ? color : null}
          emissiveIntensity={glowing ? 0.5 : 0}
        />
      </Sphere>
    </React.Fragment>
  );
};

export default Neuron;
