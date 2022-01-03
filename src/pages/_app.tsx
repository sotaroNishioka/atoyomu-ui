/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import MyThemeProvider from '../components/MyTheneProvider'
import IndexProvider from '../lib/provider/IndexProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MyThemeProvider>
        <IndexProvider>
          <Component {...pageProps} />
        </IndexProvider>
      </MyThemeProvider>
    </>
  )
  return <Component {...pageProps} />
}

export default MyApp
