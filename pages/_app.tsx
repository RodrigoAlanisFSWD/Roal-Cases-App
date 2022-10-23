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

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {

  const dispatch = useDispatch()

  const init = async () => {
    const tokens = getTokens()

    if (tokens.access_token && tokens.refresh_token) {

      const user = await getProfile()

      dispatch(
        authenticateUser({
          ...tokens,
          profile: user
        })
      );
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
