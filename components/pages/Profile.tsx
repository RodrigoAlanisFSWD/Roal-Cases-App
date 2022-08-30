import React, { useEffect, useState } from 'react'
import { User } from '../../models/user';
import { useUserService } from '../../services/userService';
import { Main } from '../layouts/Main';
import { Navbar } from '../molecules/shared/Navbar';
import styles from '../../styles/pages/Profile.module.scss'
import { useSelector } from 'react-redux';
import { store, StoreState } from '../../store';

export const Profile = () => {
    const user = useSelector((store: StoreState) => store.auth.profile)

    return (
       <Main>
            <div className={styles['profile']}>
                <h2>
                    { user?.name }
                </h2>

                <h3>
                    Mail: { user?.email }
                </h3>

                <h3>
                    Verificado: { user?.mail_confirmed ? 'Si' : 'No' }
                </h3>

                <h3>
                    Puntos Totales: { user?.points }
                </h3>
            </div>
       </Main>
    )
}
