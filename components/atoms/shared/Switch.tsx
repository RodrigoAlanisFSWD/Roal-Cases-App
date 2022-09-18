import React, { FC } from 'react'
import styles from '../../../styles/atoms/shared/Switch.module.scss'

interface SwitchProps {
    onChange: () => void;
    isActive: boolean;
}

export const Switch: FC<SwitchProps> = ({ onChange, isActive }) => {
  return (
    <div onClick={() => onChange()} className={`${styles['switch']} ${isActive ? styles['switch--active'] : ''}`}>
        <div className={styles['switch__dot']}>

        </div>
    </div>
  )
}
