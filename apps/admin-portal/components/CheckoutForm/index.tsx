/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { setAlert } from '@store/appSlice';
import {
  useCreateCheckoutMutation,
  useGetBookByIdMutation,
  useGetPolicyMutation,
  useGetReaderByIdMutation,
  useUpdateCheckoutMutation,
} from '@store/libraryApi';
import { ReaderToBooks } from 'pages/checkout';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { detailText, flex, formControl, input, label, title } from './styles';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

export interface CheckoutFormValue {
  readerId: number;
  bookId: number;
}

interface CheckoutFormProps {
  isOpen: boolean;
  checkoutEdit: ReaderToBooks;
  onClose: (value: boolean) => void;
  created: (value: boolean) => void;
}

const CheckoutForm = (props: CheckoutFormProps) => {
  const { isOpen = false, checkoutEdit, onClose, created } = props;
  const initialValue: CheckoutFormValue = {
    readerId: undefined,
    bookId: undefined,
  };

  const [openPopup, setOpenPopup] = useState(isOpen);
  const [values, setValues] = useState(initialValue);
  const [createCheckout, { isSuccess, isError, error }] =
    useCreateCheckoutMutation();
  const [updateCheckout, updateResult] = useUpdateCheckoutMutation();
  const [findReader, findReaderResult] = useGetReaderByIdMutation();
  const [findBook, findBookResult] = useGetBookByIdMutation();
  const [readerChecked, setReaderChecked] = useState(null);
  const [bookChecked, setBookChecked] = useState(null);
  const [allValid, setAllValid] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [checkout, setCheckout] = useState(checkoutEdit);
  const [createValue, setCreateValue] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [getPolicy, result] = useGetPolicyMutation();
  const [maxDatePolicy, setMaxDatePolicy] = useState(null);
  const [borrowedDate, setBorrowedDate] = useState(1);
  const [isBorrowed, setIsBorrowed] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    // reset all value
    setOpenPopup(false);
    onClose(false);
    setValues(initialValue);
    setAllValid(false);
    setShowDetail(false);
    setIsEdit(false);
    setCreateValue([]);
    setIsBorrowed(false);
  };

  const handleSave = () => {
    if (checkout?.id) {
      updateCheckout({ id: checkout.id, body: values });
    } else {
      const value = createValue.map((x) => {
        return {
          readerId: values.readerId,
          bookId: x.id,
          borrowedDate: x.borrowedDate,
        };
      });
      createCheckout(value);
    }
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

  const handleAddBookToList = () => {
    if (createValue.length > 0) {
      const isDuplicate = createValue.find((book) => book.id == bookChecked.id);
      if (isDuplicate?.id) {
        dispatch(
          setAlert({
            severity: 'error',
            message: `Sách [${isDuplicate.name}] đã tồn tại trong danh sách`,
          })
        );
        return;
      }
      setCreateValue([...createValue, { ...bookChecked, borrowedDate }]);
    }
    setCreateValue([...createValue, { ...bookChecked, borrowedDate }]);
  };

  const handleRemoveCheckout = (index: number) => {
    const newValue = [...createValue];
    newValue.splice(index, 1);
    setCreateValue(newValue);
  };

  useEffect(() => {
    if (findReaderResult.isSuccess) {
      setReaderChecked(findReaderResult.data);
    }

    if (findBookResult.isSuccess) {
      setBookChecked(findBookResult.data);

      // uncheck when show popup edit in first time
      if (checkoutEdit?.bookId !== findBookResult?.data?.id) {
        setIsBorrowed(findBookResult?.data?.borrowed);
      }
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
    if (updateResult.isSuccess) {
      created(true);
      dispatch(setAlert({ message: 'Chỉnh sửa phiếu mượn sách thành công' }));
      handleClose();
    }
  }, [updateResult.isSuccess]);

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

  useEffect(() => {
    if (updateResult.isError) {
      const { status, data } = updateResult.error as any;
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
  }, [updateResult.isError]);

  useEffect(() => {
    if (result.isSuccess) {
      const { maxDate = 4 } = result.data;
      const value = [];
      for (let i = 1; i <= maxDate; i++) {
        value.push(i);
      }
      setMaxDatePolicy(value);
    }
  }, [result.isSuccess]);

  // Re-render when isOpen change
  useEffect(() => {
    setOpenPopup(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setCheckout(checkoutEdit);
    if (checkoutEdit?.id) {
      const { readerId, bookId } = checkoutEdit;
      setValues({ readerId, bookId });
      findReader(readerId);
      findBook(bookId);
      setShowDetail(true);
      setIsEdit(true);
    }
  }, [checkoutEdit]);

  useEffect(() => {
    getPolicy(null);
  }, []);

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
          <Box>
            <Box
              sx={{
                marginTop: '20px',
                minWidth: '500px',
                display: 'flex',
              }}
            >
              <Box sx={{ flex: 1 }}>
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
              </Box>

              <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
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
            </Box>
            {isBorrowed && (
              <Box sx={{ marginTop: '10px' }}>
                <Typography sx={{ color: 'red', fontFamily: 'Montserrat' }}>
                  Sách đang được cho mượn - vui lòng chọn sách khác
                </Typography>
              </Box>
            )}

            {!isEdit && !isBorrowed && (
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  <Typography variant="inherit" sx={detailText}>
                    Số ngày mượn:
                  </Typography>
                  <FormControl>
                    <Select
                      size="small"
                      value={borrowedDate}
                      onChange={(e) => setBorrowedDate(+e.target.value)}
                    >
                      {maxDatePolicy?.map((date) => (
                        <MenuItem key={date} value={date}>
                          {date}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleAddBookToList}
                >
                  Thêm vào danh sách
                </Button>
              </Box>
            )}
          </Box>
        )}
        {createValue.length > 0 && (
          <Box sx={{ mt: '20px' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên sách</TableCell>
                    <TableCell>Thể loại</TableCell>
                    <TableCell>Tác giả</TableCell>
                    <TableCell>Ngày mượn</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {createValue.map((book, index) => (
                    <TableRow key={index}>
                      <TableCell>{book?.name}</TableCell>
                      <TableCell>{book?.type?.name}</TableCell>
                      <TableCell>{book?.author}</TableCell>
                      <TableCell>{book?.borrowedDate}</TableCell>
                      <TableCell>
                        <HighlightOffOutlinedIcon
                          onClick={() => handleRemoveCheckout(index)}
                          sx={{ cursor: 'pointer', color: 'red' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: 'red' }} onClick={handleClose}>
          Hủy
        </Button>
        <Button
          disabled={!allValid || (createValue.length < 1 && !isEdit)}
          onClick={handleSave}
        >
          {checkout?.id ? 'Sửa' : 'Tạo'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutForm;
