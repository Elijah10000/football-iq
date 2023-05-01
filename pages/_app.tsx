import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { GlobalProvider } from 'contexts/GlobalContext';
import { SessionProvider } from 'next-auth/react';

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </SessionProvider>
  );
}

export default App;
