import API from '@api/index';
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
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Reader } from 'pages/reader';
import React, { useContext, useEffect, useState } from 'react';
import { flex, formControl, input, label, title } from './styles';
export interface CardValue {
  name: string;
  email: string;
  address: string;
  type: 'STUDENT' | 'TEACHER';
  dob: string;
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
    dob: '',
  };
  const [open, setOpen] = useState(isOpen);
  const [reader, setReader] = useState(readerEdit);
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
    setReader(null);
    setValues(initialValue);
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
        showToast({
          message: 'Lập thẻ độc giả thành công',
        });
        valueChange(values);
        handleClose();
      })
      .catch((error) => {
        const message = 'Lập thẻ độc giả không thành công';
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

  const handleUpdateReader = (id: number, values) => {
    API.put(`/reader/${id}`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        showToast({
          message: 'Chỉnh sửa thẻ độc giả thành công',
        });
        valueChange(values);
        handleClose();
      })
      .catch((error) => {
        const message = 'Lập thẻ độc giả không thành công';
        if (error?.response?.status === 422) {
          showToast({
            severity: 'error',
            title: 'Oopps!',
            message: error?.response?.data?.message || message,
          });
        }
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
      setValues({ name, email, address, type, dob });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readerEdit]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={title}>
        {reader?.id ? 'CHỈNH SỬA THÔNG TIN' : 'LẬP THẺ ĐỘC GIẢ'}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            minWidth: '500px',
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
              marginBottom: '10px',
            }}
          >
            <Typography variant="inherit" sx={label}>
              Loại độc giả:
            </Typography>
            <FormControl variant="standard" size="small">
              <Select
                sx={{ width: 150 }}
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
            <FormControl sx={formControl}>
              <TextField
                variant="standard"
                size="small"
                id="date"
                type="date"
                value={values?.dob}
                onChange={handleChange('dob')}
                sx={{ width: 150 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
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
