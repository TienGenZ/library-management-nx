import RouteGuard from '@components/RouteGuard';
import Toast from '@components/AlertMessages';
import { Box } from '@mui/material';
import reduxStore from '@store/store';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MenuBar from '../components/MenuBar';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const excludeMenuPath = ['/sign-in', '/'];
  const isShowMenuBar = !excludeMenuPath.includes(router.asPath.split('?')[0]);
  const { persistor, store } = reduxStore();

  return (
    <Provider store={store}>
      <Head>
        <title>Library Management</title>
        <link rel="shortcut icon" href="/imgs/ico.png" />
      </Head>
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
    </Provider>
  );
}

export default CustomApp;
