import React from 'react'
import { Main } from '../layouts/Main';
import { useSelector } from 'react-redux';
import { store, StoreState } from '../../store';
import { useAuthService } from '../../services/authService';
import { Button } from '../atoms/shared/Button';

export const Profile = () => {
    const user = useSelector((store: StoreState) => store.auth.profile)

    const { logout } = useAuthService();

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

                <Button text='Cerrar Sesion' onClick={async () => await logout()} />
            </div>
       </Main>
    )
}
