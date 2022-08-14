import React, { FC } from 'react'
import styles from '../../styles/atoms/Button.module.scss'

interface ButtonProps {
    text: string;
    className?: any;
}

export const Button: FC<ButtonProps> = ({ text, className }) => {
  return (
    <div className={`${styles['btn']} ${className}`}>
        { text }
    </div>
  )
}
