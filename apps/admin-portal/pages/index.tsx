import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function Index() {
  const router = useRouter();
  useEffect(() => {
    router.push('/sign-in');
  }, []);

  return (
    <Box sx={{ height: '100vh', width: '100vw' }}>
      <h1>Chào mừng bạn đến với Thư Viện</h1>
    </Box>
  );
}

export default Index;
