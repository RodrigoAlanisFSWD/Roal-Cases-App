import React, { FC } from 'react'
import { Navbar } from '../molecules/shared/Navbar'
import styles from '../../styles/layouts/Main.module.scss'
import { Footer } from '../organisms/shared/Footer'

export const Main: FC<any> = ({ children }) => {
  return (
    <>
      <div className="w-screen min-h-screen">

          <Navbar />

          <div className='w-full min-h-screen object-cover pt-[100px] flex justify-center items-center'>
            {children}
          </div>

        <Footer />
      </div>
    </>

  )
}
