import {FC} from "react";
import styles from '../../../styles/molecules/auth/AfterRegisterModal.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import { Button } from "../../atoms/shared/Button";
import { useRouter } from "next/router";

export const AfterRegister = () => {

    const router = useRouter()

    return (
        <div className={styles['wrapper']}>
            <div className={styles['afterRegisterModal']}>
                <div className={styles['afterRegisterModal__header']}>
                    <h2>
                        Gracias Por Registrarte!
                    </h2>
                </div>
                <div className={styles['afterRegisterModal__content']}>
                    Ahora Te Pedimos Completes La Verificacion De Correo Electronico.
                     A Tu Correo Llego Un Codigo Que Debes Ingresar, Cuando Estes Listo Da Click En Continuar

                    <Button text="Continuar" onClick={() => {
                        router.push("/verify_email")
                    }} className={styles['afterRegisterModal__btn']} />
                </div>
            </div>
        </div>
    )
}