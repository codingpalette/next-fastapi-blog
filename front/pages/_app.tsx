import {useState} from "react";
import type { AppProps } from 'next/app'
import { Global } from '@emotion/react';
import {globalStyles} from "../lib/globalStyles";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import axios from 'axios'
import Setting from "./_setting";
import '../styles/globals.css'

config.autoAddCss = false

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

function MyApp({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        retry: 0,
        enabled: true,
      },
    },
  })

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Global styles={globalStyles} />
          <Setting>
            <Component {...pageProps} />
          </Setting>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
