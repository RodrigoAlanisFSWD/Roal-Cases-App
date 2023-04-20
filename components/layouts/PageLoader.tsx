import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export const PageLoader = () => {
    let circleCommonClasses = 'h-2.5 w-2.5 bg-current   rounded-full';

    return (
        <motion.div initial={{ x: 500, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 500, opacity: 1 }} className='w-screen h-screen flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-xl'>
                    Loading Page...
                </h1>

                <div className='flex mt-5 text-secondary'>
                    <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
                    <div
                        className={`${circleCommonClasses} mr-1 animate-bounce200`}
                    ></div>
                    <div className={`${circleCommonClasses} animate-bounce400`}></div>
                </div>
            </div>

        </motion.div>

    );
}
