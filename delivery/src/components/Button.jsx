import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      className="rounded-full border-solid border-2 border-gray-300 py-2 px-4 hover:bg-gray-700 hover:text-gray-100"
      onClick={!onClick ? console.log("") : onClick}
    
    >
      {children || "Button"}
    </button>
  );
};

export default Button;
