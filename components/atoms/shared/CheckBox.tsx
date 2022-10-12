import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, useState } from 'react'

interface CheckBoxProps {
    isActive: boolean;
    onChange: () => void;
}

export const CheckBox: FC<CheckBoxProps> = ({ isActive, onChange }) => {

  return (
    <div className={`border rounded-sm w-[25px] h-[25px] flex justify-center items-center ${isActive ? "border-primary bg-primary" : "border-gray-200 bg-white"} transition-all duration-300`} onClick={onChange}>
        <AnimatePresence>
        {
            isActive && (
                <motion.div initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}>
                    <FontAwesomeIcon className='text-white' icon={faCheck} />
                </motion.div>
            )
        }
    </AnimatePresence>
    </div>
  )
}
