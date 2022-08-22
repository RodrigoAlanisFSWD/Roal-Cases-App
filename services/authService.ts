import {AuthRepository} from "../repo/authRepository";
import {User} from "../models/user";
import {useDispatch} from "react-redux";
import * as authActions from '../store/actions/auth'

export const useAuthService = () => {

    const authRepository = new AuthRepository();
    const dispatch = useDispatch();

    const signUp = async (user: Object) => {
        try {
            const tokens = await authRepository.signUp(user as User);

            dispatch(authActions.authenticateUser(tokens.access_token, tokens.refresh_token))
        } catch (e) {
            dispatch(authActions.setAuthError('Usa Otro Correo O Prueba Mas Tarde'))
        }
    }

    const signIn = async (user: Object) => {
        try {
            const tokens = await authRepository.signIn(user as User);

            dispatch(authActions.authenticateUser(tokens.access_token, tokens.refresh_token))
        } catch (e) {
            console.log(e)
            dispatch(authActions.setAuthError('El Correo O La Contrasena Son Invalidos'))
        }
    }

    const logout = async () => {
        try {
            await authRepository.logout()

            dispatch(authActions.logout())
        } catch (e) {
            dispatch(authActions.setAuthError('Eror Al Cerrar Sesion'))
        }
    }

    const setLoading = (loading: boolean) => dispatch(authActions.setAuthLoading(loading))


    const setInitial = () => dispatch(authActions.setAuthInitial())

    return {
        signUp,
        signIn,
        logout,
        setLoading,
        setInitial
    }
}