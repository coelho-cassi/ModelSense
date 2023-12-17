import React from "react";
import { Menu, DynamicScene } from "../../components";
import graphic1 from "../../assets/graphic1.png";

const AboutPage = () => {
  return (
    <div className="relative bg-primary_bg min-h-screen overflow-hidden flex justify-center items-center">
      {/* Background Graphic */}
      <img src={graphic1} alt="Graphic 1" className="z-0 absolute right-0" />

      {/* Menu Container */}
      <div className="absolute top-0 left-0 p-1">
        <Menu></Menu>
      </div>

      {/* DynamicScene - Centered */}
      <div className="z-10">
        <DynamicScene
          layers={10}
          hiddenLayers={8}
          nodes={[3, 6, 4, 6, 4, 160, 20, 8, 4, 1]}
          top3={[
            [5, 2, 1],
            [2, 4, 1],
            [2, 4, 1],
            [2, 4, 1],
            [2, 4, 1],
            [2, 4, 1],
            [2, 4, 1],
            [2, 4, 1],
          ]}
        ></DynamicScene>
      </div>
    </div>
  );
};

export default AboutPage;
