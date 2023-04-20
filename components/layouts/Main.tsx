import React, { FC } from 'react'
import { Navbar } from '../molecules/shared/Navbar'
import { Footer } from '../organisms/shared/Footer'
import { motion } from 'framer-motion'

export const Main: FC<any> = ({ children }) => {
  return (
        <motion.div initial={{ x: 500, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 500, opacity: 1 }} className="w-screen min-h-screen">

          <Navbar />

          <div className='w-full min-h-screen object-cover pt-[100px] flex justify-center items-center'>
            {children}
          </div>

          <Footer />
        </motion.div>
  )
}
