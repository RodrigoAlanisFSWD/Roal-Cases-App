import {FC} from "react";
import styles from '../../../styles/organisms/auth/AuthForm.module.scss'
import {faEnvelope, faLock, faUser} from '@fortawesome/free-solid-svg-icons'
import {Button} from "../../atoms/shared/Button";
import {FormControl} from "../../atoms/shared/FormControl";

export const SignUpForm: FC = () => {
    return (
        <div className={styles['authForm']}>
            <h2>
                Crear Una Cuenta
            </h2>

            <div className={styles['authForm__divider']}>
                Ingresa Los Datos Para Crear Tu Cuenta
            </div>

            <form className={styles['authForm__form']}>
                <FormControl className={styles['authForm__input']} placeholder="Nombre" type="text"
                             name="name" icon={faUser}/>
                <FormControl className={styles['authForm__input']} placeholder="Correo Electronico" type="email"
                             name="email" icon={faEnvelope}/>
                <FormControl className={styles['authForm__input']} placeholder="Contrasena" type="password"
                             name="password" icon={faLock}/>

                <Button text="Crear" className={styles['authForm__btn']}/>
                <Button text="Iniciar Sesion" type="outlined"/>
            </form>
        </div>

    )
}