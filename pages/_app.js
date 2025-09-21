import '../styles/globals.css'
import { AuthProvider } from '../contexts/AuthContext'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  )
}