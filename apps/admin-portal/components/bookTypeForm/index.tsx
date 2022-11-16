/* eslint-disable react-hooks/exhaustive-deps */
import { BookType } from '@components/BookType';

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
  useCreateBookTypeMutation,
  useUpdateBookTypeMutation,
} from '@store/libraryApi';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { flex, formControl, input, label, title } from './styles';

interface FormCardProps {
  bookTypeEdit?: BookType;
  isOpen: boolean;
  onClose: (value: boolean) => void;
  valueChange: (value: BookType) => void;
}

const BookTypeForm = (props: FormCardProps) => {
  const { bookTypeEdit, isOpen = false, onClose, valueChange } = props;
  const initialValue = { name: '' };

  const [open, setOpen] = useState(isOpen);
  const [bookType, setBookType] = useState(bookTypeEdit);
  const [values, setValues] = useState(initialValue);
  const [createBookType, createResult] = useCreateBookTypeMutation();
  const [updateBookType, updateResult] = useUpdateBookTypeMutation();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    onClose(false);
    setBookType(null);
    setValues(initialValue);
  };

  const handleChange =
    (prop: keyof BookType) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleSave = () => {
    const value = { name: values.name.trim() };
    if (bookType?.id) {
      updateBookType({ id: bookType.id, body: value });
    } else {
      createBookType(value);
    }
  };

  useEffect(() => {
    if (createResult.isSuccess || updateResult.isSuccess) {
      dispatch(setAlert({ message: 'Thao tác thành công' }));
      valueChange(values as any);
      handleClose();
    }
  }, [createResult.isSuccess, updateResult.isSuccess]);

  useEffect(() => {
    if (createResult.isError || updateResult.isError) {
      const isConflic =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        createResult.error?.status === 409 ||
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        updateResult.error?.status === 409;

      if (isConflic) {
        dispatch(
          setAlert({ severity: 'error', message: 'Thể loại sách đã tồn tại' })
        );
      } else {
        dispatch(
          setAlert({
            severity: 'error',
            message: 'Thao tác không thành công. Vui lòng thử lại',
          })
        );
      }
    }
  }, [createResult.isError, updateResult.isError]);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setBookType(bookTypeEdit);

    if (bookTypeEdit?.id) {
      const { name } = bookTypeEdit;
      setValues({ name });
    }
  }, [bookTypeEdit]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={title}>
        {bookType?.id ? 'CHỈNH SỬA THỂ LOẠI SÁCH' : 'THÊM THỂ LOẠI SÁCH'}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            minWidth: '500px',
          }}
        >
          <Box sx={flex}>
            <Typography variant="inherit" sx={label}>
              Thể loại sách:
            </Typography>
            <FormControl sx={formControl}>
              <TextField
                variant="standard"
                size="small"
                type="text"
                value={values?.name}
                onChange={handleChange('name')}
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
        <Button onClick={handleSave}>{bookType?.id ? 'Lưu' : 'Tạo'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookTypeForm;
