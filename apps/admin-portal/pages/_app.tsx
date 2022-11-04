import RouteGuard from '@components/RouteGuard';
import Toast from '@components/ToastMessage';
import { Context, ContextProps } from '@context/state';
import { Box } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MenuBar from '../components/MenuBar';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const excludeMenuPath = ['/sign-in', '/'];
  const isShowMenuBar = !excludeMenuPath.includes(router.asPath.split('?')[0]);
  const [context, setContext] = useState({});

  return (
    <>
      <Head>
        <title>Library Management</title>
        <link rel="shortcut icon" href="/imgs/ico.png" />
      </Head>
      <Context.Provider value={[context, setContext]}>
        <RouteGuard>
          <Box>
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
          </Box>
        </RouteGuard>
      </Context.Provider>
    </>
  );
}

export default CustomApp;
