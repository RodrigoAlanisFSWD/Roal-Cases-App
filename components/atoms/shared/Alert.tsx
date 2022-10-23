import React, { FC } from 'react'

interface AlertProps {
    text: string;
    className?: string;
}

export const Alert: FC<AlertProps> = ({ text, className }) => {
  return (
    <div className={`w-full bg-danger rounded-sm h-[45px] text-white flex items-center justify-center text-xl ${className}`}>
        { text }
    </div>
  )
}
