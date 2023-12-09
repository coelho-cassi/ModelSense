import React from "react";
import {
  Menu,
  TopBgWindow,
  UploadButtonSm,
  ViewingWindow,
  InsightsWindow,
  BotBgWindow,
} from "../../components";
import graphic2 from "../../assets/graphic2.png";

const VisualizationPage = () => {
  return (
    <div className="relative bg-primary_bg min-h-screen overflow-hidden">
      {/* Background Graphic */}
      <img src={graphic2} alt="Graphic 2" className="z-0 mx-auto pt-14" />

      {/* Menu Container */}
      <div className="absolute top-0 left-0 p-1">
        <Menu></Menu>
      </div>

      {/* TopBgWindow Container */}
      <div className="absolute top-16 mt-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1 mr-16">
        <TopBgWindow></TopBgWindow>
        {/* UploadButton Container */}
        <div className="absolute top-0 mt-11 left-3/4">
          <UploadButtonSm></UploadButtonSm>
        </div>
      </div>
      {/* ViewingWindow Container */}
      <div className="absolute top-52 right-1/2 ">
        <ViewingWindow></ViewingWindow>
      </div>
      {/* InisightsWindow Container */}
      <div className="absolute top-52 left-1/2 ml-5">
        <InsightsWindow></InsightsWindow>
      </div>
      {/* BotBgWindow Container */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1">
        <BotBgWindow></BotBgWindow>
      </div>
    </div>
  );
};

export default VisualizationPage;
