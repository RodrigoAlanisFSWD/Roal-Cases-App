import React, {FC} from "react";
import styles from "../../../styles/atoms/shared/Button.module.scss";

interface ButtonProps {
    text: string;
    className?: any;
    onClick?: () => void;
    type?: string;
}

export const Button: FC<ButtonProps> = ({text, className, onClick, type}) => {
    return <div onClick={onClick}
                className={`${styles["btn"]} ${type === 'outlined' ? styles['btn--outlined'] : ''} ${className}`}>{text}</div>;
};
