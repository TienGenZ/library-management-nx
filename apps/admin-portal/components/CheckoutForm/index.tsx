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
import {
  useCreateCheckoutMutation,
  useGetBookByIdMutation,
  useGetReaderByIdMutation,
} from '@store/libraryApi';
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
  const [checkout, { isSuccess, isError, error }] = useCreateCheckoutMutation();
  const [findReader, findReaderResult] = useGetReaderByIdMutation();
  const [findBook, findBookResult] = useGetBookByIdMutation();
  const [readerChecked, setReaderChecked] = useState(null);
  const [bookChecked, setBookChecked] = useState(null);
  const [allValid, setAllValid] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenPopup(false);
    onClose(false);
    setValues(initialValue);
    setAllValid(false);
    setShowDetail(false);
  };

  const handleChange =
    (prop: keyof CheckoutFormValue) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: +event.target.value });
    };

  const handlePreCheckout = () => {
    const { readerId, bookId } = values;
    if (readerId) {
      findReader(readerId);
    }
    if (bookId) {
      findBook(bookId);
    }
  };

  useEffect(() => {
    if (findReaderResult.isSuccess) {
      setReaderChecked(findReaderResult.data);
    }

    if (findBookResult.isSuccess) {
      setBookChecked(findBookResult.data);
    }

    if (findBookResult.isSuccess && findReaderResult.isSuccess) {
      setShowDetail(true);
      setAllValid(true);
    }
  }, [findReaderResult.isSuccess, findBookResult.isSuccess]);

  useEffect(() => {
    if (findReaderResult.isError) {
      setReaderChecked(null);
      dispatch(
        setAlert({
          severity: 'error',
          message: 'Thông tin mã độc giả không chính xác',
        })
      );
    }
    if (findBookResult.isError) {
      setBookChecked(null);
      dispatch(
        setAlert({
          severity: 'error',
          message: 'Thông tin mã sách không chính xác',
        })
      );
    }
    if (findBookResult.isError || findReaderResult.isError) {
      setAllValid(false);
    }
  }, [findReaderResult.isError, findBookResult.isError]);

  useEffect(() => {
    if (isSuccess) {
      created(true);
      dispatch(setAlert({ message: 'Lập phiếu mượn sách thành công' }));
      handleClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      const { status, data } = error as any;
      created(false);
      if (status === 422) {
        dispatch(
          setAlert({
            severity: 'error',
            message: data.message,
          })
        );
      } else {
        dispatch(
          setAlert({
            severity: 'error',
            message: 'Có lỗi xảy ra vui lòng thử lại',
          })
        );
      }
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

          <Button onClick={handlePreCheckout}>Kiểm tra</Button>
        </Box>
        {showDetail && (
          <Box
            sx={{
              marginTop: '20px',
              minWidth: '500px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  display: 'flex',
                  marginBottom: '10px',
                  marginRight: '20px',
                }}
              >
                <Typography variant="inherit" sx={detailText}>
                  Tên độc giả:
                </Typography>
                <Typography
                  variant="inherit"
                  sx={{ fontSize: '15px', fontWeight: '500' }}
                >
                  {readerChecked?.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', marginBottom: '10px' }}>
                <Typography variant="inherit" sx={detailText}>
                  Email:
                </Typography>
                <Typography
                  variant="inherit"
                  sx={{ fontSize: '15px', fontWeight: '500' }}
                >
                  {readerChecked?.email}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <Typography variant="inherit" sx={detailText}>
                Tên sách:
              </Typography>
              <Typography
                variant="inherit"
                sx={{ fontSize: '15px', fontWeight: '500' }}
              >
                {bookChecked?.name}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', marginBottom: '10px' }}>
              <Typography variant="inherit" sx={detailText}>
                Nhà xuất bản:
              </Typography>
              <Typography
                variant="inherit"
                sx={{ fontSize: '15px', fontWeight: '500' }}
              >
                {bookChecked?.publisher?.name}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  display: 'flex',
                  marginBottom: '10px',
                  marginRight: '20px',
                }}
              >
                <Typography variant="inherit" sx={detailText}>
                  Thể loại:
                </Typography>
                <Typography
                  variant="inherit"
                  sx={{ fontSize: '15px', fontWeight: '500' }}
                >
                  {bookChecked?.type?.name}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', marginBottom: '10px' }}>
                <Typography variant="inherit" sx={detailText}>
                  Tác giả:
                </Typography>
                <Typography
                  variant="inherit"
                  sx={{ fontSize: '15px', fontWeight: '500' }}
                >
                  {bookChecked?.author}
                </Typography>
              </Box>
            </Box>

            {/* <Box sx={{ display: 'flex', marginBottom: '10px' }}>
                    <Typography variant="inherit" sx={detailText}>
                      Hạn trả sách:{' '}
                    </Typography>
                    <Typography
                      variant="inherit"
                      sx={{ fontSize: '15px', fontWeight: '500' }}
                    >
                      today
                    </Typography>
                  </Box> */}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button disabled={!allValid} onClick={() => checkout(values)}>
          Tạo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutForm;
