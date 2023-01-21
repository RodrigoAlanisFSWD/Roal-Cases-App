import React from 'react'

export const YesOrNo = () => {
  return (
    <div className='w-[75px] h-[35px] flex rounded-sm'>
        <div className={`w-2/4 bg-background text-primary flex justify-center items-center text-lg hover:bg-primary hover:text-white cursor-pointer transition-all duration-200`}>
            Si
        </div>
        <div className={`w-2/4 bg-background text-danger flex justify-center items-center text-lg hover:bg-danger hover:text-white cursor-pointer transition-all duration-200`}>
            No
        </div>
    </div>
  )
}
