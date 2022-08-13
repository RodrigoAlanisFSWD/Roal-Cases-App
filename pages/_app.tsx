import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { AppProps } from 'next/app'
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
