import API from '@api/index';

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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Reader } from 'pages/reader';
import React, { useEffect, useState } from 'react';
import { flex, formControl, input, label, title } from './styles';

export interface CardValue {
  name: string;
  email: string;
  address: string;
  type: 'STUDENT' | 'TEACHER';
  dob: Dayjs | null;
}

interface FormCardProps {
  readerEdit?: Reader;
  isOpen: boolean;
  onClose: (value: boolean) => void;
  valueChange: (value: CardValue) => void;
}

const FormCard = (props: FormCardProps) => {
  const { readerEdit, isOpen = false, onClose, valueChange } = props;
  const initialValue: CardValue = {
    name: '',
    email: '',
    address: '',
    type: 'STUDENT',
    dob: null,
  };
  const [open, setOpen] = useState(isOpen);
  const [reader, setReader] = useState(readerEdit);
  const [values, setValues] = useState(initialValue);
  const [dob, setDob] = useState<Dayjs | null>(null);

  const handleClose = () => {
    setOpen(false);
    onClose(false);
    setReader(null);
    setValues(initialValue);
    setDob(null);
  };

  const handleChange =
    (prop: keyof CardValue) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleCreateReader = (values) => {
    API.post('/reader', values, {
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

  const handleUpdateReader = (id: number, values) => {
    API.put(`/reader/${id}`, values, {
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
    if (reader?.id) {
      handleUpdateReader(reader.id, values);
    } else {
      handleCreateReader(values);
    }
  };

  // Re-render when isOpen change
  useEffect(() => {
    setOpen(isOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Re-render when isOpen change
  useEffect(() => {
    setReader(readerEdit);

    if (readerEdit?.id) {
      const { name, email, address, type, dob } = readerEdit;
      setValues({ name, email, address, type, dob: null });
      setDob(dayjs(dob));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readerEdit]);

  return (
    <Dialog maxWidth="xl" open={open} onClose={handleClose}>
      <DialogTitle sx={title}>
        {reader?.id ? 'CHỈNH SỬA THÔNG TIN' : 'LẬP THẺ ĐỘC GIẢ'}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            minWidth: '700px',
            padding: '0 20px',
          }}
        >
          <Box sx={flex}>
            <Typography variant="inherit" sx={label}>
              Họ và Tên:
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
              Email:
            </Typography>
            <FormControl sx={formControl}>
              <TextField
                variant="standard"
                size="small"
                type="text"
                value={values?.email}
                onChange={handleChange('email')}
                InputProps={{
                  sx: input,
                }}
              />
            </FormControl>
          </Box>

          <Box sx={flex}>
            <Typography variant="inherit" sx={label}>
              Địa chỉ:
            </Typography>
            <FormControl sx={formControl}>
              <TextField
                variant="standard"
                size="small"
                type="text"
                value={values?.address}
                onChange={handleChange('address')}
                InputProps={{
                  sx: input,
                }}
              />
            </FormControl>
          </Box>

          <Box
            sx={{
              display: 'flex',
              marginBottom: '20px',
              marginTop: '10px',
            }}
          >
            <Typography variant="inherit" sx={label}>
              Loại độc giả:
            </Typography>
            <FormControl variant="standard" size="small">
              <Select
                sx={{ width: 150, fontFamily: 'Montserrat', padding: '0 10px' }}
                value={values?.type}
                onChange={handleChange('type')}
              >
                <MenuItem value={'STUDENT'}>Học sinh</MenuItem>
                <MenuItem value={'TEACHER'}>Giáo viên</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={flex}>
            <Typography variant="inherit" sx={label}>
              Ngày sinh:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                openTo="year"
                views={['year', 'month', 'day']}
                value={dob}
                onChange={(date: Dayjs) => {
                  setDob(date);
                  setValues({ ...values, dob: date });
                }}
                maxDate={dayjs(new Date())}
                inputFormat="DD-MM-YYYY"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    size="small"
                    sx={{
                      width: 150,
                      fontFamily: 'Montserrat',
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleSave}>{reader?.id ? 'Lưu' : 'Tạo'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormCard;
