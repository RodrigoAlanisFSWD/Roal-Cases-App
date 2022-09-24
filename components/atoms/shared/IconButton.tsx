import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'

interface IconButtonProps {
    icon: IconProp;
    color: string;
    onClick?: () => void;
    className?: string;
}

export const IconButton: FC<IconButtonProps> = ({ icon, color, onClick, className }) => {
    return color == "primary" ? (
    <div onClick={onClick} className={`border-2 bg-primary border-primary p-[10px] w-[40px] h-[40px] flex items-center justify-center rounded-sm transition-all duration-300 sm:w-[50px] sm:h-[50px] text-white hover:bg-transparent hover:text-primary ${className}`}>
        <FontAwesomeIcon icon={icon} className="text-lg sm:text-xl" />
    </div>
    ) : (
    <div onClick={onClick} className={`border-2 bg-danger border-danger p-[10px] w-[40px] h-[40px] flex items-center justify-center rounded-sm transition-all duration-300 sm:w-[50px] sm:h-[50px] text-white hover:bg-transparent hover:text-danger ${className}`}>
        <FontAwesomeIcon icon={icon} className="text-lg sm:text-xl" />
    </div>
    )
}
