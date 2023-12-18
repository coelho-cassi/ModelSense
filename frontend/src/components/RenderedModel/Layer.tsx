import React from "react";
import { RoundedBox } from "@react-three/drei";

const Layer = ({ xPos, layerIndex, getColorForLayer }) => {
  const layerHeight = 5; // Define the fixed height for each layer here
  return (
    <RoundedBox
      args={[5, layerHeight, 0.2]}
      position={[xPos, 0, 0]}
      rotation={[0, Math.PI / 2, 0]}
    >
      <meshPhysicalMaterial
        color={getColorForLayer(layerIndex)}
        roughness={0.3}
        metalness={0.7}
      />
    </RoundedBox>
  );
};

export default Layer;
