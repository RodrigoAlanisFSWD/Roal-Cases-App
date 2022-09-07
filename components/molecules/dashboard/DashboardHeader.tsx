import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'
import { StoreState } from '../../../store'
import styles from '../../../styles/molecules/dashboard/DashboardHeader.module.scss'

export const DashboardHeader = () => {

    const profile = useSelector((store: StoreState) => store.auth.profile)

    return (
        <div className={styles['dashboardHeader']}>
            <div className={styles['dashboardHeader__content']}>

            </div>
            <div className={styles['dashboardHeader__info']}>
                <FontAwesomeIcon icon={faBell} className={styles['dashboardHeader__bell']} />
                <div className={styles['dashboardHeader__user']}>
                    <FontAwesomeIcon icon={faUserCircle} className={styles['dashboardHeader__icon']} />
                    <div>
                        <h3>
                            {profile?.name}
                        </h3>
                        <h4>
                            Administrador
                        </h4>
                    </div>

                </div>
            </div>
        </div>
    )
}
