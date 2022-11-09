import { Alert, AlertTitle, Snackbar, Stack } from '@mui/material';
import { setAlert } from '@store/appSlice';
import { AppState } from '@store/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface AlertProps {
  severity?: 'success' | 'info' | 'warning' | 'error';
  title?: string | null;
  message?: string | null;
}

const AlertMessages = () => {
  const dispatch = useDispatch();
  const initialValue = {
    severity: null,
    title: null,
    message: null,
  };
  const [notify, setNotify] = useState<AlertProps>(initialValue);
  const alertInStore = useSelector((state: AppState) => state.app.notification);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    dispatch(setAlert(initialValue));
    if (reason === 'clickaway') {
      return;
    }
  };

  useEffect(() => {
    setNotify(alertInStore);
  }, [alertInStore]);

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={notify?.message ? true : false}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={notify?.severity || 'success'}
          sx={{ width: '100%', fontWeight: 500 }}
          
        >
          <AlertTitle sx={{ fontWeight: 600 }}>{notify?.title}</AlertTitle>
          {notify?.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default AlertMessages;
