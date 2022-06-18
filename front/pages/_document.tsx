import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="utf-8"></meta>
        <title>타이틀</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}