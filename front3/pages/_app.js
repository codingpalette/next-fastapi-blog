import React from "react";
import Head from 'next/head';
import {RecoilRoot} from "recoil";
import { CacheProvider } from '@emotion/react';
import useSWR, { SWRConfig } from 'swr'
import createEmotionCache from '../src/createEmotionCache';
import axios from 'axios'
import '../styles/globals.css'


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;



  return (
    <RecoilRoot>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <SWRConfig
          value={{
            revalidateOnFocus: false, //창이 포커싱되었을 때 자동 갱신
            shouldRetryOnError: false, //fetcher에 에러가 있을 때 재시도
            errorRetryCount: 0, // 최대 에러 재시도 수
            refreshInterval: 1000 * 60 * 5 // 통신 성공시 재갱신 시간
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </CacheProvider>
    </RecoilRoot>
  );
}

