import React from "react";

interface ButtonProps {
  text: string;
  bg: string;
}

const Button = ({ text, bg }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-4 rounded-xl cursor-pointer w-full md:w-50 
      transition-all duration-300 ease-in-out 
      hover:bg-sky-500 hover:text-white hover:border-sky-500
      border border-zinc-300 dark:border-zinc-700
      whitespace-nowrap font-bold active:scale-95 ${bg}`}
    >
      {text}
    </button>
  );
};

export default Button;
