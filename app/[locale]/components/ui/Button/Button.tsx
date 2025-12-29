import React from "react";

interface ButtonProps {
  text: string;
  bg: string;
}

const Button = ({ text, bg }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-4 rounded cursor-pointer w-50 duration-200 hover:bg-sky-400 hover:text-white border whitespace-nowrap max-w-50 ${bg}`}
    >
      {text}
    </button>
  );
};

export default Button;
