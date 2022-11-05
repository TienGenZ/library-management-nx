import API from '@api/index';
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
import React, { useEffect, useState } from 'react';
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

  const handleCreateBookType = (values) => {
    API.post('/book-type', values, {
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

  const handleUpdateBookType = (id: number, values) => {
    API.put(`/book-type/${id}`, values, {
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

  const handleSave = () => {
    if (bookType?.id) {
      handleUpdateBookType(bookType.id, values);
    } else {
      handleCreateBookType(values);
    }
  };

  // Re-render when isOpen change
  useEffect(() => {
    setOpen(isOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Re-render when isOpen change
  useEffect(() => {
    setBookType(bookTypeEdit);

    if (bookTypeEdit?.id) {
      const { name } = bookTypeEdit;
      setValues({ name });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
