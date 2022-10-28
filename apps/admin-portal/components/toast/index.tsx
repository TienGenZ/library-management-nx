import { Context } from '@context/state';
import { Alert, AlertTitle, Snackbar, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';

export interface ToastProps {
  isShow?: boolean;
  severity?: 'success' | 'info' | 'warning' | 'error';
  title?: string;
  message?: string;
}

const Toast = () => {
  const [context] = useContext(Context);
  const [toast, setToast] = useState<ToastProps>(context.toast);

  useEffect(() => {
    setToast(context.toast);
  }, [context.toast]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast({ ...toast, isShow: false });
  };
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={toast.isShow}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.severity || 'success'}
          sx={{ width: '100%' }}
        >
          <AlertTitle>{toast.title}</AlertTitle>
          {toast.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Toast;
