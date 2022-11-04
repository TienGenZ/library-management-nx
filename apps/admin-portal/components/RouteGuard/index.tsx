import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Context } from '@context/state';

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const [context, setContext] = useContext(Context);
  const [authorized, setAuthorized] = useState(context?.authorized);

  useEffect(() => {
    const auth = window.localStorage.getItem('authorized');

    // on initial load - run auth check
    if (auth || authorized) {
      setAuthorized(true);
      setContext({ ...context, authorized: true });
      return;
    }

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

  const authCheck = (url: string) => {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ['/sign-in'];
    const path = url.split('?')[0];
    if (!authorized && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push('/sign-in');
    } else {
      setAuthorized(true);
    }
  };

  return authorized && children;
};

export default RouteGuard;
