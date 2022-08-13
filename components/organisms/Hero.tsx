import React from 'react'
import styles from '../../styles/organisms/Hero.module.scss'
import { Button } from '../atoms/Button'
import { HeroPolaroid } from '../atoms/HeroPolaroid'

export const Hero = () => {
  return (
    <div className={styles['hero']}>
      <div className={styles['hero__images']}>
        <HeroPolaroid image="/case.svg" size='xl' className={styles['hero__image-xl']} />
        <HeroPolaroid image="/case.svg" size='sm' className={styles['hero__image-small']} />
      </div>

      <div className={styles['hero__info']}>
        <h2>
          Titulo Del Hero
        </h2>

        <Button text="Ver Mas" className={styles['hero__btn']} />
      </div>
    </div>
  )
}
