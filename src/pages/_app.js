import '@/styles/globals.css'
import Alert from 'components/Alert'
import Navbar from 'components/Navbar'
export default function App({ Component, pageProps }) {
  return (

    <>
      <Navbar/>
      <Component {...pageProps} />
    </>
  )
}
