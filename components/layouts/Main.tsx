import React, { FC } from 'react'
import { Navbar } from '../molecules/shared/Navbar'
import styles from '../../styles/layouts/Main.module.scss'
import { Footer } from '../organisms/shared/Footer'

export const Main: FC<any> = ({ children }) => {
  return (
    <div className={styles['main']}>

        <div className={styles['main__content']}>
            <Navbar />

            { children }
        </div>

        <Footer/>
    </div>
  )
}
