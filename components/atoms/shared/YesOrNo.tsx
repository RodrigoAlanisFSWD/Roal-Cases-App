import React, { FC } from 'react'

interface YerOrNoProps {
  value: boolean;
  onChange: (payload: boolean) => void;
}

export const YesOrNo: FC<YerOrNoProps> = ({ value, onChange }) => {
  return (
    <div className='w-[75px] h-[35px] flex rounded-sm'>
        <div onClick={() => onChange(true)} className={`w-2/4 flex justify-center items-center text-lg hover:bg-primary hover:text-white cursor-pointer transition-all duration-200 ${value ? 'bg-primary text-white' : 'bg-background text-primary'}`}>
            Si
        </div>
        <div onClick={() => onChange(false)} className={`w-2/4 flex justify-center items-center text-lg hover:bg-danger hover:text-white cursor-pointer transition-all duration-200 ${!value ? 'bg-danger text-white'  : 'bg-background text-danger'}`}>
            No
        </div>
    </div>
  )
}
