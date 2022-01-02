import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import MyThemeProvider from '../components/MyTheneProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MyThemeProvider>
        <Component {...pageProps} />
      </MyThemeProvider>
    </React.Fragment>
  )
  return <Component {...pageProps} />
}

export default MyApp
