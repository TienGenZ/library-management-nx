import { AppState } from '@store/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const auth = useSelector((state: AppState) => state.app.authorized);

  console.log(`Auth: ${auth}`);
  const [authorized, setAuthorized] = useState(auth);

  useEffect(() => {
    // on initial load - run auth check
    if (authorized) return;

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
  }, [authorized]);

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
