import React from "react";
import { Sphere, Text } from "@react-three/drei";

const Neuron = ({
  nodeId,
  nodeIndex,
  yPos,
  sphereRadius,
  getColorForSphere,
  layerIndex,
}) => {
  return (
    <React.Fragment>
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
        position={[-1.5 + nodeIndex * 0.75, yPos + 0.3, sphereRadius]}
        fontSize={0.1}
        color="#ffffff"
        textAlign="center"
        anchorY="middle"
      >
        {nodeId.toString()}
      </Text>
    </React.Fragment>
  );
};

export default Neuron;
