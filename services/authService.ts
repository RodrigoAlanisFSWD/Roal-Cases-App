import { AuthRepository } from "../repo/authRepository";
import { User } from "../models/user";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import * as authTypes from "../store/types/auth";
import { useUserService } from "./userService";

export const useAuthService = () => {
  const authRepository = new AuthRepository();
  const dispatch = useDispatch();

  const { getProfile } = useUserService()

  const signUp = async (user: Object) => {
    try {
      const tokens = await authRepository.signUp(user as User);

      const profile = await getProfile()

      dispatch(
        authActions.authenticateUser(tokens.access_token, tokens.refresh_token, profile)
      );
    } catch (e) {
      dispatch(authActions.setAuthError("Usa Otro Correo O Prueba Mas Tarde"));
    }
  };

  const signIn = async (user: Object) => {
    try {
      const tokens = await authRepository.signIn(user as User);

      const profile = await getProfile()

      dispatch(
        authActions.authenticateUser(tokens.access_token, tokens.refresh_token, profile)
      );
    } catch (e) {
      console.log(e);
      dispatch(
        authActions.setAuthError("El Correo O La Contrasena Son Invalidos")
      );
    }
  };

  const logout = async () => {
    try {
      await authRepository.logout();

      dispatch(authActions.logout());
    } catch (e) {
      dispatch(authActions.setAuthError("Eror Al Cerrar Sesion"));
    }
  };

  const setLoading = (loading: boolean) =>
    dispatch(authActions.setAuthLoading(loading));

  const setInitial = (state: any = authTypes.UNAUNTHENTICATED) => dispatch(authActions.setAuthInitial(state));

  const initAuth = async () => {
    const tokens = authRepository.getTokens();

    if (tokens.access_token && tokens.refresh_token) {

      const user = await getProfile()

      dispatch(
        authActions.authenticateUser(tokens.access_token, tokens.refresh_token, user)
      );
    } else {
      dispatch(authActions.setAuthInitial());
    }
  };

  const verifyMail = async (code: string) => {
    try {
      const tokens = await authRepository.verifyEmail(code)

      const profile = await getProfile()

      dispatch(
        authActions.authenticateUser(tokens.access_token, tokens.refresh_token, profile)
      );
    } catch (e) {
      dispatch(authActions.setAuthError("El Codigo Es Incorrecto"));
    }
  }

  return {
    signUp,
    signIn,
    logout,
    setLoading,
    setInitial,
    initAuth,
    verifyMail,
  };
};
