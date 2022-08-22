import {FC} from "react";
import styles from '../../styles/pages/Sign.module.scss'
import {Navbar} from "../molecules/shared/Navbar";
import {Footer} from "../organisms/shared/Footer";
import {SignUpForm} from "../organisms/auth/SignUpForm";

export const SignUp: FC = () => {
    return (
        <div className={styles['login']}>
            <div className={styles['login__content']}>
                <Navbar/>

                <SignUpForm/>
            </div>

            <Footer/>
        </div>
    )
}