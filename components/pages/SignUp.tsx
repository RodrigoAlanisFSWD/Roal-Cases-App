import {FC, useEffect, useState} from "react";
import {SignUpForm} from "../organisms/auth/SignUpForm";
import * as authTypes from "../../store/types/auth";
import {AlertModal} from "../molecules/shared/AlertModal";
import {useSelector} from "react-redux";
import {StoreState} from "../../store";
import {useAuthService} from "../../services/authService";
import { Main } from "../layouts/Main";
import { AfterRegister } from "../molecules/auth/AfterRegisterModal";

export const SignUp: FC = () => {

    const {state, errorMsg} = useSelector((store: StoreState) => store.auth);
    const {setInitial} = useAuthService()

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (state === authTypes.AUTHENTICATED) {
            setShowModal(true)
        }
    }, [state])

    return (
        <>
            <Main>
                <SignUpForm/>
            </Main>
            {
                state === authTypes.AUTH_ERROR ?
                    <AlertModal onClose={() => setInitial()} title="Crear Cuenta" body={errorMsg}/>
                    : null
            }
            {
                showModal ? <AfterRegister /> : null
            }
        </>

    )
}