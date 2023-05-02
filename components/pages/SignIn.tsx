import {FC, useState} from "react";
import {SignInForm} from "../organisms/auth/SignInForm";
import {AlertModal} from "../molecules/shared/AlertModal";
import {useSelector} from "react-redux";
import * as authTypes from '../../redux/types/auth'
import { Main } from "../layouts/Main";
import { useDispatch } from "react-redux";
import { authInitial } from "../../redux/states/auth";
import { AppStore } from "../../redux/store";
import { Modal } from "../layouts/Modal";

export const SignIn: FC = () => {

    const {state, errorMsg} = useSelector((store: AppStore) => store.auth);
    const dispatch = useDispatch()

    return (
        <>
            <Main>
                <SignInForm/>
            </Main>
            <Modal
            title="Error Al Iniciar Sesion" show={state === authTypes.AUTH_ERROR} onClose={() => dispatch(authInitial(authTypes.UNAUNTHENTICATED))}
            error={true}
            >
                <h2 className="text-lg">
                    Ha ocurrido un error al intentar iniciar sesion, verifica que las credenciales sean correctas o intentalo mas tarde.
                </h2>
            </Modal>
        </>

    )
}
