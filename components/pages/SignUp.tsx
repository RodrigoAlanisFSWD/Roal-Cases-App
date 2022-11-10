import {FC, useEffect, useState} from "react";
import {SignUpForm} from "../organisms/auth/SignUpForm";
import * as authTypes from "../../redux/types/auth";
import {AlertModal} from "../molecules/shared/AlertModal";
import {useSelector} from "react-redux";
import { Main } from "../layouts/Main";
import { AfterRegister } from "../molecules/auth/AfterRegisterModal";
import { AppStore } from "../../redux/store";
import { authInitial } from "../../redux/states/auth";
import { useDispatch } from "react-redux";

export const SignUp: FC = () => {

    const {state, errorMsg} = useSelector((store: AppStore) => store.auth);

    const [showModal, setShowModal] = useState(false)

    const dispatch = useDispatch()

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
                    <AlertModal onClose={() => dispatch(authInitial(authTypes.UNAUNTHENTICATED))} title="Crear Cuenta" body={errorMsg}/>
                    : null
            }
            {
                showModal ? <AfterRegister /> : null
            }
        </>

    )
}