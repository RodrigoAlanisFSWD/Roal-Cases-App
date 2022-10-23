import React from 'react'
import { Main } from '../layouts/Main';
import { useSelector } from 'react-redux';
import { Button } from '../atoms/shared/Button';
import { AppStore } from '../../redux/store';
import { logout } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/states/auth';

export const Profile = () => {
    const user = useSelector((store: AppStore) => store.auth.profile)

    const dispatch = useDispatch()

    return (
       <Main>
            <div className="row-[2/3] w-full max-w-lg h-[300px] rounded-md flex flex-col items-center justify-center shadow-md px-6">
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

                <Button text='Cerrar Sesion' onClick={async () => {
                    logout()
                    dispatch(logoutUser())
                }} />
            </div>
       </Main>
    )
}
