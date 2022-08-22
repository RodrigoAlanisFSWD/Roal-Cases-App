import {FC} from "react";
import styles from '../../styles/pages/Sign.module.scss'
import {Navbar} from "../molecules/shared/Navbar";
import {Footer} from "../organisms/shared/Footer";
import {SignUpForm} from "../organisms/auth/SignUpForm";
import * as authTypes from "../../store/types/auth";
import {AlertModal} from "../molecules/shared/AlertModal";
import {useSelector} from "react-redux";
import {StoreState} from "../../store";
import {useAuthService} from "../../services/authService";

export const SignUp: FC = () => {

    const {state, errorMsg} = useSelector((store: StoreState) => store.auth);
    const {setInitial} = useAuthService()

    return (
        <>
            <div className={styles['login']}>
                <div className={styles['login__content']}>
                    <Navbar/>

                    <SignUpForm/>
                </div>

                <Footer/>
            </div>
            {
                state === authTypes.AUTH_ERROR ?
                    <AlertModal onClose={() => setInitial()} title="Crear Cuenta" body={errorMsg}/>
                    : null
            }
        </>

    )
}