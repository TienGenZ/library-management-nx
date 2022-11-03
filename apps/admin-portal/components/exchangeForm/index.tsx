import API from '@api/index';
import { Book } from '@components/listBook';
import { ToastProps } from '@components/toast';
import { Context } from '@context/state';
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
import { ReaderToBooks } from 'pages/exchange';
import React, { useContext, useEffect, useState } from 'react';
import { flex, formControl, input, label, title } from './styles';

export interface ExchangeFormValue {
  readerId: number;
  bookId: number;
  expiredAt: string;
}

interface ExchangeFormProps {
  valueEdit?: ReaderToBooks;
  isOpen: boolean;
  onClose: (value: boolean) => void;
  valueChange: (value: ExchangeFormValue) => void;
}

const ExchangeForm = (props: ExchangeFormProps) => {
  const { valueEdit, isOpen = false, onClose, valueChange } = props;
  const initialValue: ExchangeFormValue = {
    readerId: undefined,
    bookId: undefined,
    expiredAt: '',
  };

  const [open, setOpen] = useState(isOpen);
  const [book, setBook] = useState(valueEdit);
  const [values, setValues] = useState(initialValue);
  const [context, setContext] = useContext(Context);

  const showToast = (props: ToastProps) => {
    setContext({
      ...context,
      toast: {
        isShow: true,
        ...props,
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
    onClose(false);
    setBook(null);
    setValues(initialValue);
  };

  const handleChange =
    (prop: keyof ExchangeFormValue) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: +event.target.value });
    };

  const handleCreateReaderToBooks = (values) => {
    API.post('/checkout', values, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        showToast({
          message: 'Lập phiếu mượn sách thành công',
        });
        valueChange(values);
        handleClose();
      })
      .catch((error) => {
        const message = 'Lập phiếu mượn sách không thành công';
        if (error?.response?.status === 422) {
          showToast({
            severity: 'error',
            title: 'Oopps!',
            message: error?.response?.data?.message || message,
          });
        }
        console.log(error);
      });
  };

  const handleUpdateReaderToBooks = (id: number, values) => {
    API.put(`/checkout/${id}`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        showToast({
          message: 'Chỉnh sửa thông tin thành công',
        });
        valueChange(values);
        handleClose();
      })
      .catch((error) => {
        showToast({
          severity: 'error',
          title: 'Oopps!',
          message: 'Chỉnh sửa thông tin không thành công',
        });
        console.log(error);
      });
  };

  const handleSave = () => {
    if (book?.id) {
      handleUpdateReaderToBooks(book.id, values);
    } else {
      handleCreateReaderToBooks(values);
    }
  };

  // Re-render when isOpen change
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  // Re-render when isOpen change
  useEffect(() => {
    setBook(valueEdit);
  }, [valueEdit]);

  return (
    <Dialog open={open} onClose={handleClose}>
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
        <Button onClick={handleSave}>{book?.id ? 'Lưu' : 'Tạo'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExchangeForm;
