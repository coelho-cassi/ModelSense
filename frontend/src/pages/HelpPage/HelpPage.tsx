import React from "react";
import { Menu, RenderedModel } from "../../components";
import graphic1 from "../../assets/graphic1.png";

const HelpPage = () => {
  return (
    <div className="relative bg-primary_bg min-h-screen overflow-hidden">
      {/* Background Graphic */}
      <img src={graphic1} alt="Graphic 1" className="z-0 absolute right-0" />

      {/* Menu Container */}
      <div className="absolute top-0 left-0 p-1">
        <Menu></Menu>
      </div>

      {/* RenderedModel - Centered */}
      <div className="absolute right-1/3 bottom-1/3">
        <RenderedModel
          layers={6}
          hiddenLayers={4}
          nodes={[3, 6, 4, 81, 4, 1]}
        ></RenderedModel>
      </div>
    </div>
  );
};

export default HelpPage;
