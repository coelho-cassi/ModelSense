import React from "react";
import { Menu } from "../../components";
import graphic1 from "../../assets/graphic1.png";

const AboutPage = () => {
  return (
    <div className="relative bg-primary_bg min-h-screen overflow-hidden">
      {/* Background Graphic */}
      <img src={graphic1} alt="Graphic 1" className="z-0 absolute right-0" />

      {/* Menu Container */}
      <div className="absolute top-0 left-0 p-1">
        <Menu></Menu>
      </div>
    </div>
  );
};

export default AboutPage;
