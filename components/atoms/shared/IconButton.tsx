import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC } from 'react'
import styles from '../../../styles/atoms/shared/IconButton.module.scss'

interface IconButtonProps {
    icon: IconProp;
    color: string;
}

export const IconButton: FC<IconButtonProps> = ({ icon, color }) => {
    return (
        <div className={`${styles['iconBtn']} ${styles['iconBtn--' + color]}`}>
            <FontAwesomeIcon icon={icon} className={styles['iconBtn__icon']} />
        </div>
    )
}
