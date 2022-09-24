import React, { FC } from 'react'
import { Navbar } from '../molecules/shared/Navbar'
import styles from '../../styles/layouts/Main.module.scss'
import { Footer } from '../organisms/shared/Footer'

export const Main: FC<any> = ({ children }) => {
  return (
    <div className="w-screen min-h-screen">

        <div className="w-screen h-screen min-h-[700px] grid grid-cols-1 grid-rows-[75px_1fr] justify-items-center items-center">
            <Navbar />

            { children }
        </div>

        <Footer/>
    </div>
  )
}
