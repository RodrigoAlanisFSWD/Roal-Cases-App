import React, { FC } from 'react'

interface ModalProps {
    children: JSX.Element
}

export const Modal: FC<ModalProps> = ({ children }) => {
    return (
        <div className="top-0 fixed w-screen h-screen bg-modal flex z-[10000000] justify-center items-center">
            {children}
        </div>
    )
}
