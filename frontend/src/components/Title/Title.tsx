import React from "react";
// Title.tsx

interface TitleProps {
  className?: string;
}

const Title: React.FC<TitleProps> = ({ className }) => {
  return (
    <h1 className=" font-nunito font-nunito_800 text-primary_text text-6xl">
      Model Sense
    </h1>
  );
};

export default Title;
