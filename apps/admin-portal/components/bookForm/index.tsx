/* eslint-disable react-hooks/exhaustive-deps */
import { Book } from '@components/BookList';
import { BookType } from '@components/BookType';
import { PublisherValue } from '@components/PublisherTab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { setAlert } from '@store/appSlice';
import {
  useCreateBookMutation,
  useGetAllBookTypeMutation,
  useGetAllPublisherMutation,
  useUpdateBookMutation,
} from '@store/libraryApi';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { flex, formControl, input, label, MenuProps, title } from './styles';

export interface BookFormValue {
  name: string;
  author: string;
  bookTypeId: number;
  publisherId: number;
  publishedAt: string;
}

interface BookFormProps {
  bookEdit?: Book;
  isOpen: boolean;
  onClose: (value: boolean) => void;
  valueChange: (value: BookFormValue) => void;
}

const BookForm = (props: BookFormProps) => {
  const { bookEdit, isOpen = false, onClose, valueChange } = props;
  const initialValue: BookFormValue = {
    name: '',
    author: '',
    bookTypeId: null,
    publisherId: null,
    publishedAt: '',
  };
  const [years] = useState(() => {
    const result: number[] = [];
    const currentYear: number = new Date().getFullYear();
    for (let i = 0; i <= 100; i++) {
      result.push(currentYear - i);
    }
    return result;
  });
  const [open, setOpen] = useState(isOpen);
  const [book, setBook] = useState(bookEdit);
  const [values, setValues] = useState(initialValue);
  const [bookTypes, setBookTypes] = useState<BookType[]>([]);
  const [publishers, setPublishers] = useState<PublisherValue[]>([]);
  const [createBook, createResult] = useCreateBookMutation();
  const [updateBook, updateResult] = useUpdateBookMutation();
  const [getBookType, getBookTypeResult] = useGetAllBookTypeMutation();
  const [getPublisher, getPublisherResult] = useGetAllPublisherMutation();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    onClose(false);
    setBook(null);
    setValues(initialValue);
  };

  const handleChange =
    (prop: keyof BookFormValue) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleSave = () => {
    const { bookTypeId, publisherId, publishedAt, name, author } = values;
    if (book?.id) {
      updateBook({
        id: book.id,
        body: {
          bookTypeId,
          publisherId,
          publishedAt,
          name,
          author,
        },
      });
    } else {
      createBook(values);
    }
  };

  useEffect(() => {
    setOpen(isOpen);
    if (isOpen) {
      getBookType(null);
      getPublisher(null);
    }
  }, [isOpen]);

  useEffect(() => {
    setBook(bookEdit);

    if (bookEdit?.id) {
      setValues(bookEdit);
    }
  }, [bookEdit]);

  useEffect(() => {
    if (getPublisherResult.isSuccess) {
      setPublishers(getPublisherResult?.data);
    }
  }, [getPublisherResult.isSuccess]);

  useEffect(() => {
    if (getBookTypeResult.isSuccess) {
      setBookTypes(getBookTypeResult?.data);
    }
  }, [getBookTypeResult.isSuccess]);

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
          setAlert({ severity: 'error', message: 'Thông tin sách đã tồn tại' })
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

  return (
    <Dialog maxWidth="xl" open={open} onClose={handleClose}>
      <DialogTitle sx={title}>
        {bookEdit?.id ? 'CHỈNH SỬA THÔNG TIN SÁCH' : 'THÊM SÁCH'}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            minWidth: '700px',
          }}
        >
          <Box sx={flex}>
            <Typography variant="inherit" sx={label}>
              Tên sách:
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

          <Box sx={flex}>
            <Typography variant="inherit" sx={label}>
              Tác giả:
            </Typography>
            <FormControl sx={formControl}>
              <TextField
                variant="standard"
                size="small"
                type="text"
                value={values?.author}
                onChange={handleChange('author')}
                InputProps={{
                  sx: input,
                }}
              />
            </FormControl>
          </Box>

          <Box sx={flex}>
            <Typography variant="inherit" sx={label}>
              Năm xuất bản:
            </Typography>
            <FormControl sx={formControl}>
              <Select
                variant="standard"
                size="small"
                value={values?.publishedAt}
                label="Age"
                onChange={handleChange('publishedAt')}
                MenuProps={MenuProps}
                sx={{ paddingLeft: '10px' }}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: 'flex',
              marginBottom: '20px',
            }}
          >
            <Typography variant="inherit" sx={label}>
              Thể loại:
            </Typography>
            <FormControl sx={{ flex: 1 }} variant="standard" size="small">
              <Select
                sx={{ padding: '0 10px' }}
                value={values?.bookTypeId}
                onChange={handleChange('bookTypeId')}
              >
                {bookTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: 'flex',
              marginBottom: '20px',
            }}
          >
            <Typography variant="inherit" sx={label}>
              Nhà xuất bản:
            </Typography>
            <FormControl sx={{ flex: 1 }} variant="standard" size="small">
              <Select
                sx={{ padding: '0 10px' }}
                value={values?.publisherId}
                onChange={handleChange('publisherId')}
              >
                {publishers.map((publisher) => (
                  <MenuItem key={publisher.id} value={publisher.id}>
                    {publisher.name}
                  </MenuItem>
                ))}
              </Select>
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

export default BookForm;
