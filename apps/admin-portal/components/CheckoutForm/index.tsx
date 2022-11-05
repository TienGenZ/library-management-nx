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
import { useCreateCheckoutMutation } from '@store/libraryApi';
import React, { useEffect, useState } from 'react';
import { flex, formControl, input, label, title } from './styles';

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
    created(true);
    handleClose();
  }, [isSuccess]);

  useEffect(() => {
    created(false);
    handleClose();
  }, [isError]);

  // Re-render when isOpen change
  useEffect(() => {
    setOpenPopup(isOpen);
  }, [isOpen]);

  return (
    <Dialog open={openPopup} onClose={handleClose}>
      <DialogTitle sx={title}>PHIẾU MƯỢN SÁCH</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            minWidth: '500px',
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
