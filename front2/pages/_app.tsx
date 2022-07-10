// _app.tsx
import type { AppProps } from "next/app";
import React, {useEffect} from "react";
import {RecoilRoot} from "recoil";


import Layout from "../components/Layout";




const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </>
  );
};

export default App;