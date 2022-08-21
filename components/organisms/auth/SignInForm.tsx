import {FC} from "react";
import styles from '../../../styles/organisms/auth/AuthForm.module.scss'
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'
import {Button} from "../../atoms/shared/Button";
import {FormControl} from "../../atoms/shared/FormControl";

export const SignInForm: FC = () => {
    return (
        <div className={styles['authForm']}>
            <h2>
                Iniciar Sesion
            </h2>

            <div className={styles['authForm__divider']}>
                Ingresa Los Datos Para Continuar
            </div>

            <form className={styles['authForm__form']}>
                <FormControl className={styles['authForm__input']} placeholder="Correo Electronico" type="email"
                             name="email" icon={faEnvelope}/>
                <FormControl className={styles['authForm__input']} placeholder="Contrasena" type="password"
                             name="password" icon={faLock}/>

                <Button text="Iniciar Sesion" className={styles['authForm__btn']}/>
                <Button text="Crear Una Cuenta" type="outlined"/>
            </form>
        </div>

    )
}