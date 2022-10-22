import { Box } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MenuBar from '../components/menuBar';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const excludeMenuPath = ['/sign-in', '/'];
  const isShowMenuBar = !excludeMenuPath.includes(router.asPath.split('?')[0]);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ['/sign-in'];
    const path = url.split('?')[0];
    // eslint-disable-next-line no-constant-condition
    if (false && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push('/sign-in');
    } else {
      setAuthorized(true);
    }
  }

  return (
    <>
      <Head>
        <title>Library Management</title>
        <link rel="shortcut icon" href="/imgs/ico.png" />
      </Head>
      <Box>
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
    </>
  );
}

export default CustomApp;
