/* BotBgWindow.tsx
   Integrates RadioButton instances and provides a user 
   interface for selecting different types of insights.
*/

import React from "react";
import { RadioButton } from "../../components";

interface BotBgWindowProps {
  className?: string;
  onInsightSelect: (value: string) => void;
}

const BotBgWindow: React.FC<BotBgWindowProps> = ({
  className,
  onInsightSelect,
}) => {
  // When a radio button is clicked, call onInsightSelect with the corresponding value
  return (
    <div className="relative w-156 h-32">
      {/* White Rectangle (Bottom) */}
      <div className="absolute inset-0 bg-secondary_bg rounded-lg opacity-80 shadow"></div>

      {/* Blue Rectangle (Top) */}
      <div className="absolute inset-0 bg-third_bg rounded-lg m-6">
        <div className="flex justify-between px-6 mt-6">
          <RadioButton
            label="LIME Insights"
            id="lime"
            name="category"
            onChange={() => onInsightSelect("LIME Insights")}
          />
          <RadioButton
            label="SHAP Insights"
            id="shape"
            name="category"
            onChange={() => onInsightSelect("SHAP Insights")}
          />
          <RadioButton
            label="Layer Insights"
            id="layer"
            name="category"
            onChange={() => onInsightSelect("Layer Insights")} // Update the state in VisualizationPage
          />
          <RadioButton
            label="Neuron Insights"
            id="neuron"
            name="category"
            onChange={() => onInsightSelect("Neuron Insights")}
          />
        </div>
      </div>
    </div>
  );
};

export default BotBgWindow;
