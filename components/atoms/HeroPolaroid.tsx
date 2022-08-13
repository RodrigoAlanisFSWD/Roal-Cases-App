import React, { FC } from 'react'
import styles from '../../styles/atoms/HeroPolaroid.module.scss'

interface HeroPolaroidProps {
    changing?: Boolean;
    image: string;
    size: string;
    className?: string;
}

export const HeroPolaroid: FC<HeroPolaroidProps> = ({ image, size, className }) => {

    const getSizeClass = () => {
        switch(size) {
            case 'sm':
                return styles['hero-polaroid--sm']
            case 'md':
                return styles['hero-polaroid--md']
            case 'xl':
                return styles['hero-polaroid--xl']
        }
    }

  return (
    <div className={`${styles['hero-polaroid']} ${getSizeClass()} ${className}`}>
        <div className={styles['hero-polaroid__wrapper']}>
            <img className={styles['hero-polaroid__image']} src={image} />
        </div>
    </div>
  )
}
