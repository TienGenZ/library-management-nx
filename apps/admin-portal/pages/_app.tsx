import Toast from '@components/toast';
import { Context, ContextProps } from '@context/state';
import { Box } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MenuBar from '../components/menuBar';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const excludeMenuPath = ['/sign-in', '/'];
  const isShowMenuBar = !excludeMenuPath.includes(router.asPath.split('?')[0]);
  const contextInit: ContextProps = {
    toast: {
      isShow: false,
    },
  };
  const [context, setContext] = useState(contextInit);
  return (
    <>
      <Head>
        <title>Library Management</title>
        <link rel="shortcut icon" href="/imgs/ico.png" />
      </Head>
      <Context.Provider value={[context, setContext]}>
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
      </Context.Provider>
    </>
  );
}

export default CustomApp;
