import React, { FC } from "react";
import styles from "../../../styles/atoms/shared/Button.module.scss";

interface ButtonProps {
  text: string;
  className?: any;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ text, className, onClick }) => {
  return <div onClick={onClick} className={`${styles["btn"]} ${className}`}>{text}</div>;
};
