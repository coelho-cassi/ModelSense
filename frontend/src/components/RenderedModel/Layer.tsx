// Layer.js
import React from "react";
import { RoundedBox } from "@react-three/drei";

const Layer = ({ yPos, layerIndex, getColorForLayer }) => {
  return (
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
  );
};

export default Layer;
