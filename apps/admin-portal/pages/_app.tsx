import RouteGuard from '@components/RouteGuard';
import Toast from '@components/ToastMessage';
import { Context } from '@context/state';
import { Box } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import reduxStore from '@store/store';
import MenuBar from '../components/MenuBar';
import './styles.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const excludeMenuPath = ['/sign-in', '/'];
  const isShowMenuBar = !excludeMenuPath.includes(router.asPath.split('?')[0]);
  const [context, setContext] = useState({});
  const { persistor, store } = reduxStore();

  {
    /* <Head>
    <title>Library Management</title>
    <link rel="shortcut icon" href="/imgs/ico.png" />
  </Head> */
  }
  return (
    <Provider store={store}>
      <Context.Provider value={[context, setContext]}>
        <PersistGate loading={null} persistor={persistor}>
          <RouteGuard>
            <Toast />
            <Box
              sx={{
                display: 'flex',
                background: '#f4f5fa',
              }}
            >
              {isShowMenuBar && <MenuBar />}
              <Component {...pageProps} />
            </Box>
          </RouteGuard>
        </PersistGate>
      </Context.Provider>
    </Provider>
  );
}

export default CustomApp;
