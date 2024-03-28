import '@/styles/globals.css'
import Navbar from 'components/Navbar'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function App({ Component, pageProps }) {
  return (

    <>
    <Navbar/>
    <ProgressBar
    height="3px"
    color="#FF5700"
    options={{ showSpinner: false }}
  />

      <Component {...pageProps} />
    </>
  )
}
