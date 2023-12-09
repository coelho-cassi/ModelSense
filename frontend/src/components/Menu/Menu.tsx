import { Link } from "react-router-dom";
import React, { useState } from "react";

interface MenuProps {
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu">
      <button
        className="menu cursor-pointer text-primary_button hover:text-primary_hover text-6xl"
        onClick={toggleMenu}
      >
        ☰
      </button>
      {isOpen && (
        <div className="flex flex-col text-primary_text font-nunito text-lg">
          {/* Use Link for internal navigation */}
          <Link to="/about">About</Link>
          <Link to="/help">Help</Link>
          <Link to="/">Home</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
