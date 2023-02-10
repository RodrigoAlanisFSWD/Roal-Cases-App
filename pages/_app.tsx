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
import { AxiosInterceptor } from "../components/layouts/AxiosInterceptor";
import localFont from '@next/font/local'
import Head from "next/head";

config.autoAddCss = false;

const vogue = localFont({ src: '../assets/fonts/vogue/Vogue.ttf', variable: '--vogue', display: "swap"})
const champagne = localFont({ src: '../assets/fonts/champagne/Champagne.ttf', variable: '--champagne', display: "swap" })

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
  });

  return (
    <Provider store={store}>
      <AxiosInterceptor>
        <Head>
          <html lang="es"/>
          <title>Roal Cases</title>
          <meta 
        content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no"
        name="viewport"
      ></meta>
        </Head>
        <main className={`${vogue.variable} ${champagne.variable}`}>
          <Component {...pageProps} />
        </main>
      </AxiosInterceptor>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
