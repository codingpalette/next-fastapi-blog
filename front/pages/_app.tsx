import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Global } from '@emotion/react';
import {globalStyles} from "../lib/globalStyles";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import axios from 'axios'
config.autoAddCss = false

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
