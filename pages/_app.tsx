import { GlobalProvider } from 'contexts/GlobalContext';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import 'styles/globals.css';

function App({ Component, pageProps, session }: AppProps & { session: any }) {
  return (
    <SessionProvider session={session}>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </SessionProvider>
  );
}

export default App;