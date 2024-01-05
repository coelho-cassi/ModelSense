/* InsightsWindow.tsx
   Acts as a container for the data resulting from selecting 
   any one of the radiobuttons, also determines how they look 
   and are displayed
*/
import React from "react";

interface InsightsWindowProps {
  className?: string;
  title: string;
  content: string[];
}

const InsightsWindow: React.FC<InsightsWindowProps> = ({
  className,
  title,
  content,
}) => {
  return (
    <div className="relative w-100 h-128">
      {/* Rectangle (Bottom) */}
      <div className="absolute inset-0 bg-secondary_bg rounded-lg opacity-80 shadow">
        <div className="flex justify-center text-xl font-nunito font-nunito_500 text-primary_text mb-2 mt-5">
          {title}
        </div>
        {content.map((line, index) => (
          <p
            key={index}
            className="font-nunito font-nunito_500 text-primary_text text-lg ml-5 mt-2 pt-3"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default InsightsWindow;
