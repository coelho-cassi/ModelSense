import React from "react";

interface ViewingWindowProps {
  className?: string;
}

const ViewingWindow: React.FC<ViewingWindowProps> = ({ className }) => {
  return (
    <div className="relative w-100 h-128">
      {/* White Rectangle (Bottom) */}
      <div className="absolute inset-0 bg-secondary_bg rounded-lg opacity-80 shadow"></div>
    </div>
  );
};

export default ViewingWindow;
