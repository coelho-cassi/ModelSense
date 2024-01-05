/* RadioButton.tsx
   Reusable radio button component
*/
import React from "react";

interface RadioButtonProps {
  label: string;
  id: string;
  name: string;
  className?: string;
  onChange?: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  id,
  name,
  className,
  onChange,
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input type="radio" id={id} name={name} onChange={onChange} />{" "}
      <label
        htmlFor={id}
        className="ml-2 font-nunito font-nunito_500 text-primary_text text-m"
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
