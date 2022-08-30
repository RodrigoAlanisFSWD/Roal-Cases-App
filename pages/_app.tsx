import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Provider } from "react-redux";
import { wrapper, store } from "../store";
import { useEffect } from "react";
import { useAuthService } from "../services/authService";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const { initAuth } = useAuthService();

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
