import React from "react";

interface TopBgWindowProps {
  className?: string;
}

const TopBgWindow: React.FC<TopBgWindowProps> = ({ className }) => {
  return (
    <div className="relative w-156 h-32">
      {/* White Rectangle (Bottom) */}
      <div className="absolute inset-0 bg-secondary_bg rounded-lg opacity-80 shadow"></div>

      {/* Blue Rectangle (Top) */}
      <div className="absolute inset-0 bg-third_bg rounded-lg m-6">
        <h1 className=" font-nunito font-nunito_800 text-primary_text text-4xl mt-5 ml-10">
          Model Insights
        </h1>
      </div>
    </div>
  );
};

export default TopBgWindow;
