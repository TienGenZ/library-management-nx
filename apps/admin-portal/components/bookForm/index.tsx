import API from '@api/index';
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
import React, { useEffect, useState } from 'react';
import { flex, formControl, input, label, title } from './styles';

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

  const [open, setOpen] = useState(isOpen);
  const [book, setBook] = useState(bookEdit);
  const [values, setValues] = useState(initialValue);
  const [bookTypes, setBookTypes] = useState<BookType[]>([]);
  const [publishers, setPublishers] = useState<PublisherValue[]>([]);

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

  const handleCreateBook = (values) => {
    API.post('/book', values, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        valueChange(values);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateBook = (id: number, values) => {
    API.put(`/book/${id}`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        valueChange(values);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllBookType = () => {
    API.get('/book-type')
      .then((response) => {
        setBookTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllPublisher = () => {
    API.get('/publisher')
      .then((response) => {
        console.log(response.data);
        setPublishers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    if (book?.id) {
      handleUpdateBook(book.id, values);
    } else {
      handleCreateBook(values);
    }
  };

  // Re-render when isOpen change
  useEffect(() => {
    setOpen(isOpen);
    if (isOpen) {
      getAllBookType();
      getAllPublisher();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Re-render when isOpen change
  useEffect(() => {
    setBook(bookEdit);

    if (bookEdit?.id) {
      console.log(bookEdit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookEdit]);

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
              <TextField
                variant="standard"
                size="small"
                type="number"
                value={values?.publishedAt}
                onChange={handleChange('publishedAt')}
                InputProps={{
                  sx: input,
                  inputProps: { min: 0, max: 9999 },
                }}
              />
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
