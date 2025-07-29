// Con este Button.tsx sí puedes pasar la prop 'blue'
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  blue?: boolean;
}

const Button = ({ children, blue = false }: ButtonProps) => {
    console.log("Button component rendered with blue:", blue);
  const buttonClasses = blue 
    ? "bg-blue-500 text-white font-bold py-2 px-4 rounded" 
    : "bg-gray-500 text-white font-bold py-2 px-4 rounded";

  return (
    <button className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;