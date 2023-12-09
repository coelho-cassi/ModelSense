import React from "react";

interface RadioButtonProps {
  label: string;
  id: string;
  name: string;
  className?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  id,
  name,
  className,
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input type="radio" id={id} name={name} />
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
