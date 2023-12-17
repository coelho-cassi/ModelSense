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
        <meshPhongMaterial
          color={getColorForSphere(layerIndex, nodeId)}
          specular="#555555"
          shininess={30}
        />
      </Sphere>
    </React.Fragment>
  );
};

export default Neuron;
