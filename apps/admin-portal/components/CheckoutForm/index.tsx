/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import { setAlert } from '@store/appSlice';
import { useCreateCheckoutMutation } from '@store/libraryApi';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { detailText, flex, formControl, input, label, title } from './styles';

export interface CheckoutFormValue {
  readerId: number;
  bookId: number;
}

interface ExchangeFormProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  created: (value: boolean) => void;
}

const CheckoutForm = (props: ExchangeFormProps) => {
  const { isOpen = false, onClose, created } = props;
  const initialValue: CheckoutFormValue = {
    readerId: undefined,
    bookId: undefined,
  };

  const [openPopup, setOpenPopup] = useState(isOpen);
  const [values, setValues] = useState(initialValue);
  const [checkout, { isSuccess, isError }] = useCreateCheckoutMutation();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenPopup(false);
    onClose(false);
    setValues(initialValue);
  };

  const handleChange =
    (prop: keyof CheckoutFormValue) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: +event.target.value });
    };

  useEffect(() => {
    if (isSuccess) {
      created(true);
      dispatch(setAlert({ message: 'Lập phiếu mượn sách thành công' }));
      handleClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      created(false);
      dispatch(
        setAlert({
          severity: 'error',
          message: 'Có lỗi xảy ra vui lòng thử lại',
        })
      );
    }
  }, [isError]);

  // Re-render when isOpen change
  useEffect(() => {
    setOpenPopup(isOpen);
  }, [isOpen]);

  return (
    <Dialog maxWidth="xl" open={openPopup} onClose={handleClose}>
      <DialogTitle sx={title}>PHIẾU MƯỢN SÁCH</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            minWidth: '500px',
            display: 'flex',
          }}
        >
          <Box sx={flex}>
            <Typography variant="inherit" sx={label}>
              Mã số độc giả:
            </Typography>
            <FormControl sx={formControl}>
              <TextField
                variant="standard"
                size="small"
                type="text"
                value={values?.readerId}
                onChange={handleChange('readerId')}
                InputProps={{
                  sx: input,
                }}
              />
            </FormControl>
          </Box>

          <Box sx={flex}>
            <Typography variant="inherit" sx={label}>
              Mã sách:
            </Typography>
            <FormControl sx={formControl}>
              <TextField
                variant="standard"
                size="small"
                type="text"
                value={values?.bookId}
                onChange={handleChange('bookId')}
                InputProps={{
                  sx: input,
                }}
              />
            </FormControl>
          </Box>

          <Button
            onClick={() => {
              console.log('first');
            }}
          >
            Kiểm tra
          </Button>
        </Box>

        <Box
          sx={{
            marginTop: '20px',
            minWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ marginBottom: '10px' }}>
            <Typography variant="inherit" sx={detailText}>
              Tên độc giả:{' '}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: '10px' }}>
            <Typography variant="inherit" sx={detailText}>
              Tên sách:{' '}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex' }}>
            <Box sx={{ marginBottom: '10px', marginRight: '20px' }}>
              <Typography variant="inherit" sx={detailText}>
                Thể loại:{' '}
              </Typography>
            </Box>

            <Box sx={{ marginBottom: '10px' }}>
              <Typography variant="inherit" sx={detailText}>
                Tác giả:{' '}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ marginBottom: '10px' }}>
            <Typography variant="inherit" sx={detailText}>
              Hạn trả sách:{' '}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={() => checkout(values)}>Tạo</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutForm;
