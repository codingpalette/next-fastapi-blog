import React from "react";
import Head from 'next/head';
import {RecoilRoot} from "recoil";
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import '../styles/globals.css'


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;


  return (
    <RecoilRoot>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Component {...pageProps} />
      </CacheProvider>
    </RecoilRoot>

  );
}

