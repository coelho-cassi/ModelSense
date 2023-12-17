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
      <meshPhongMaterial
        color={getColorForLayer(layerIndex)}
        specular="#555555"
        shininess={30}
      />
    </RoundedBox>
  );
};

export default Layer;
