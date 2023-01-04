import React, { FC } from "react";

interface ButtonProps {
  text: string;
  className?: any;
  onClick?: () => void;
  type?: string;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  text,
  className,
  onClick,
  type,
  disabled,
}) => {
  return (
    <div
      onClick={disabled ? () => {} : onClick}
      className={`w-full h-11 flex justify-center items-center rounded-sm text-white text-xl cursor-pointer border-2 border-primary transition-all duration-300  ${
        type === "outlined"
          ? "bg-white text-primary hover:bg-primary hover:text-white"
          : ""
      } ${
        disabled
          ? "cursor-not-allowed bg-gray-400 border-gray-400 hover:bg-gray-400 hover:text-white"
          : "bg-primary hover:bg-transparent hover:text-primary"
      } ${className}`}
    >
      {text}
    </div>
  );
};
