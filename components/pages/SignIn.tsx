import {FC, useState} from "react";
import {SignInForm} from "../organisms/auth/SignInForm";
import {AlertModal} from "../molecules/shared/AlertModal";
import {useSelector} from "react-redux";
import * as authTypes from '../../redux/types/auth'
import { Main } from "../layouts/Main";
import { useDispatch } from "react-redux";
import { authInitial } from "../../redux/states/auth";
import { AppStore } from "../../redux/store";

export const SignIn: FC = () => {

    const {state, errorMsg} = useSelector((store: AppStore) => store.auth);
    const dispatch = useDispatch()

    return (
        <>
            <Main>
                <SignInForm/>
            </Main>
            {
                state === authTypes.AUTH_ERROR ?
                    <AlertModal onClose={() => dispatch(authInitial(authTypes.UNAUNTHENTICATED))} title="Iniciar Sesion" body={errorMsg}/>
                    : null
            }
        </>

    )
}
