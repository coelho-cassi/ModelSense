import React from "react";
import { Title, Menu, UploadButtonLg } from "../../components";
import graphic1 from "../../assets/graphic1.png";

const LandingPage = () => {
  return (
    <div className="relative bg-primary_bg min-h-screen overflow-hidden">
      {/* Background Graphic */}
      <img src={graphic1} alt="Graphic 1" className="z-0 absolute right-0" />

      {/* Menu Container */}
      <div className="absolute top-0 left-0 p-1">
        <Menu></Menu>
      </div>

      {/* Title Container */}
      <div className="absolute top-1 right-1/3 mr-96 mt-72">
        <Title className="text-2xl font-bold"></Title>
      </div>

      {/* UploadButton Container */}
      <div className="absolute top-1 right-1/3 mr-96 mt-96">
        <UploadButtonLg></UploadButtonLg>
      </div>
    </div>
  );
};

export default LandingPage;
