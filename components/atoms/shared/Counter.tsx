import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'

interface CounterProps {
    count: number;
    setCount: (count: number) => void;
}

export const Counter: FC<CounterProps> = ({ count, setCount }) => {
    return (
        <div className='flex items-center justify-center w-[150px] bg-background h-[45px] rounded-sm'>
            <div className='w-1/3 h-full flex justify-center items-center text-dark text-xl hover:bg-gray-200 transition-all duration-300 cursor-pointer' onClick={() => {
                    console.log(count)
                    if (count === 1) {
                        return
                    }

                    setCount(count - 1)
                }}>
                <FontAwesomeIcon icon={faMinus} className="select-none" />
            </div>
            <div className='w-1/3 text-center text-xl font-bold'>
                { count }
            </div>
            <div className='w-1/3 h-full flex justify-center items-center text-dark text-xl hover:bg-gray-200 transition-all duration-300 cursor-pointer' onClick={() => setCount(count + 1)}>
                <FontAwesomeIcon icon={faPlus} className="select-none" />
            </div>
        </div>
    )
}
