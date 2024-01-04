/* BotBgWindow.tsx
   Integrates RadioButton instances and provides a user 
   interface for selecting different types of insights.
*/

import React from "react";
import { RadioButton } from "../../components";

interface BotBgWindowProps {
  className?: string;
}

const BotBgWindow: React.FC<BotBgWindowProps> = ({ className }) => {
  return (
    <div className="relative w-156 h-32">
      {/* White Rectangle (Bottom) */}
      <div className="absolute inset-0 bg-secondary_bg rounded-lg opacity-80 shadow"></div>

      {/* Blue Rectangle (Top) */}
      <div className="absolute inset-0 bg-third_bg rounded-lg m-6">
        <div className="flex justify-between px-6 mt-6">
          <RadioButton label="LIME Insights" id="lime" name="category" />
          <RadioButton label="SHAP Insights" id="shape" name="category" />
          <RadioButton label="Layer Insights" id="layer" name="category" />
          <RadioButton label="Neuron Insights" id="neuron" name="category" />
        </div>
      </div>
    </div>
  );
};

export default BotBgWindow;
