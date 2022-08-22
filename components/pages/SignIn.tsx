import {FC, useState} from "react";
import styles from '../../styles/pages/Sign.module.scss'
import {Navbar} from "../molecules/shared/Navbar";
import {Footer} from "../organisms/shared/Footer";
import {SignInForm} from "../organisms/auth/SignInForm";
import {AlertModal} from "../molecules/shared/AlertModal";
import {useSelector} from "react-redux";
import {StoreState} from "../../store";
import * as authTypes from '../../store/types/auth'
import {useAuthService} from "../../services/authService";

export const SignIn: FC = () => {

    const {state, errorMsg} = useSelector((store: StoreState) => store.auth);
    const {setInitial} = useAuthService()

    return (
        <>
            <div className={styles['login']}>
                <div className={styles['login__content']}>
                    <Navbar/>

                    <SignInForm/>
                </div>

                <Footer/>
            </div>
            {
                state === authTypes.AUTH_ERROR ?
                    <AlertModal onClose={() => setInitial()} title="Iniciar Sesion" body={errorMsg}/>
                    : null
            }
        </>

    )
}