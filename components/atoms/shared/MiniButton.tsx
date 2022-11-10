import React, { FC } from 'react'

interface MiniButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
}

export const MiniButton: FC<MiniButtonProps> = ({ text, onClick, className }) => {
  return (
    <div onClick={onClick} className={`bg-dark w-[75px] rounded-sm text-white text-center cursor-pointer ${className}`}>
        { text }
    </div>
  )
}
