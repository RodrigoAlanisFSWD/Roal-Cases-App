import React, { FC } from 'react'

interface SwitchProps {
  onChange: () => void;
  isActive: boolean;
}

export const Switch: FC<SwitchProps> = ({ onChange, isActive }) => {
  return (
    <div onClick={() => onChange()} className={`w-[50px] border border-gray-200 h-[26px] flex items-center justify-start cursor-pointer rounded-[25px] ${isActive ? "bg-primary justify-end" : 'bg-white'}`}>
      <div className={`w-6 h-6 rounded-[25px] ${isActive ? "bg-white" : 'bg-[#dcdcdc]'}`}>

      </div>
    </div>
  )
}
