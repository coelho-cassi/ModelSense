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
}) => {
  return (
    <React.Fragment>
      <Sphere args={[sphereRadius, 32, 32]} position={[xPos, yPos, zPos]}>
        <meshStandardMaterial
          color={getColorForSphere(layerIndex, nodeId)}
          roughness={0.3}
          metalness={0.7}
          //clearcoat={5}
        />
      </Sphere>
    </React.Fragment>
  );
};

export default Neuron;
