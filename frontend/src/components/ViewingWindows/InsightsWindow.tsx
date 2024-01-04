/* InsightsWindow.tsx
   Acts as a container for the data resulting from selecting 
   any one of the radiobuttons 
*/
import React from "react";

interface InsightsWindowProps {
  className?: string;
}

const InsightsWindow: React.FC<InsightsWindowProps> = ({ className }) => {
  return (
    <div className="relative w-100 h-128">
      {/* White Rectangle (Bottom) */}
      <div className="absolute inset-0 bg-secondary_bg rounded-lg opacity-80 shadow"></div>
    </div>
  );
};

export default InsightsWindow;
