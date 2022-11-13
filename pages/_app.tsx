import "../styles/globals.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Provider } from "react-redux";
import { store, wrapper } from "../redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile, getTokens } from "../services/authService";
import { authenticateUser, authInitial } from "../redux/states/auth";
import * as authTypes from "../redux/types/auth";
import { useRouter } from "next/router";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {

  const dispatch = useDispatch()

  const router = useRouter();

  const init = async () => {
    const tokens = getTokens()
    if (tokens.access_token && tokens.refresh_token) {
      try {

        const user = await getProfile()

        dispatch(
          authenticateUser({
            ...tokens,
            profile: user
          })
        )
      } catch (error) {
        dispatch(authInitial(authTypes.UNAUNTHENTICATED));
        router.push("/sign-in")
      }
    } else {
      dispatch(authInitial(authTypes.UNAUNTHENTICATED));
    }


  }

  useEffect(() => {
    init()
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
