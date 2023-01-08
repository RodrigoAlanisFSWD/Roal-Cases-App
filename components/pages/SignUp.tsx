import { FC, useEffect, useState } from "react";
import { SignUpForm } from "../organisms/auth/SignUpForm";
import * as authTypes from "../../redux/types/auth";
import { useSelector } from "react-redux";
import { Main } from "../layouts/Main";
import { AppStore } from "../../redux/store";
import { authInitial } from "../../redux/states/auth";
import { useDispatch } from "react-redux";
import { Modal } from "../layouts/Modal";
import { useRouter } from "next/router";
import { Button } from "../atoms/shared/Button";

export const SignUp: FC = () => {

    const { state, errorMsg } = useSelector((store: AppStore) => store.auth);

    const [showModal, setShowModal] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (state === authTypes.AUTHENTICATED) {
            setShowModal(true)
        }
    }, [state])

    const router = useRouter()

    return (
        <>
            <Main>
                <SignUpForm />
            </Main>
            <Modal
                title="Error Al Crear Una Cuenta" show={state === authTypes.AUTH_ERROR} onClose={() => dispatch(authInitial(authTypes.UNAUNTHENTICATED))}
                error={true}
            >
                <h2 className="text-lg">
                    Ha Ocurrido Un Error Al Intentar Crear Tu Cuenta, Utiliza Otras Credenciales O Intentalo Mas Tarde.
                </h2>
            </Modal>
            <Modal
                title="Verificacion De Correo"
                show={!showModal}
                onClose={() => router.push("/")}
                toolbar={
                    <Button text="Continuar" onClick={() => {
                        router.push("/verify_email")
                    }} />
                }
            >
                <div className="flex flex-col h-full text-xl">
                    <h2 className="text-xl mb-2">
                        Gracias Por Registrarte
                    </h2>
                    Da click en continuar para empezar la verificacion de tu correo electronico.
                </div>
            </Modal>
        </>

    )
}