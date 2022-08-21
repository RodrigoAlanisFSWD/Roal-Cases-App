import {AuthRepository} from "../repo/authRepository";
import {User} from "../models/user";
import {useDispatch} from "react-redux";
import * as authActions from '../store/actions/auth'

export const useAuthService = () => {

    const authRepository = new AuthRepository();
    const dispatch = useDispatch();

    const signUp = async (user: User) => {
        try {
            const tokens = await authRepository.signUp(user);

            dispatch(authActions.authenticateUser(tokens.access_token, tokens.refresh_token))
        } catch (e) {
            dispatch(authActions.setAuthError())
        }
    }

    const signIn = async (user: User) => {
        try {
            const tokens = await authRepository.signIn(user);

            dispatch(authActions.authenticateUser(tokens.access_token, tokens.refresh_token))
        } catch (e) {
            dispatch(authActions.setAuthError())
        }
    }

    const logout = async () => {
        try {
            await authRepository.logout()

            dispatch(authActions.logout())
        } catch (e) {
            dispatch(authActions.setAuthError())
        }
    }

    return {
        signUp,
        signIn,
        logout
    }
}