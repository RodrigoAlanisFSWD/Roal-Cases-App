import {FC} from "react";
import styles from '../../styles/pages/Sign.module.scss'
import {Navbar} from "../molecules/shared/Navbar";
import {Footer} from "../organisms/shared/Footer";
import {SignInForm} from "../organisms/auth/SignInForm";

export const SignIn: FC = () => {
    return (
        <div className={styles['login']}>
            <div className={styles['login__content']}>
                <Navbar/>

                <SignInForm/>
            </div>

            <Footer/>
        </div>
    )
}