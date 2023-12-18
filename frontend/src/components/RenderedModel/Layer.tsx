import React from "react";
import { RoundedBox } from "@react-three/drei";

const Layer = ({ xPos, nodeCount, layerIndex, getColorForLayer }) => {
  const layerBaseHeight = 5; // Define the fixed height for each layer here
  const maxNeuronsPerRow = 9;
  const baseRows = 9;
  const numRows = Math.ceil(nodeCount / maxNeuronsPerRow);
  const additionalRows = Math.max(numRows - baseRows, 0);
  const rowHeight = layerBaseHeight / baseRows;
  const layerHeight = layerBaseHeight + additionalRows * rowHeight;
  const maxHeight = rowHeight * 23;
  const finalHeight = Math.min(layerHeight, maxHeight);

  const yPosOffset = -(additionalRows * rowHeight * 0.5);

  return (
    <RoundedBox
      args={[5, finalHeight, 0.2]}
      position={[xPos, yPosOffset, 0]}
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
