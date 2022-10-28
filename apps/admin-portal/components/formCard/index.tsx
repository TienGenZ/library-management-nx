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
  isEdit: number;
  isOpen: boolean;
  onClose: (value: boolean) => void;
  valueChange: (value: CardValue) => void;
}

const FormCard = (props: FormCardProps) => {
  const { isEdit = null, isOpen = false, onClose, valueChange } = props;
  const initialValue: CardValue = {
    name: null,
    email: null,
    address: null,
    type: 'STUDENT',
    dob: null,
  };
  const [open, setOpen] = useState(isOpen);
  const [editId, setEditId] = useState(isEdit);
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
    setEditId(null);
    setValues(initialValue);
  };

  const handleChange =
    (prop: keyof CardValue) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleExpiredDate = (): string => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);

    const yyyy = date.getFullYear();
    let mm = (date.getMonth() + 1).toString(); // Months start at 0!
    let dd = date.getDate().toString();

    if (+dd < 10) {
      dd = '0' + dd;
    }
    if (+mm < 10) {
      mm = '0' + mm;
    }

    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSave = () => {
    if (editId) {
      showToast({
        message: 'Chỉnh sửa thẻ độc giả thành công',
      });
    } else {
      const value = {
        ...values,
        expiredAt: handleExpiredDate(),
      };

      API.post('/reader', value, {
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
          showToast({
            severity: 'error',
            title: 'Oopps!',
            message: 'Lập thẻ độc giả không thành công',
          });
          console.log(error);
        });
    }
  };
  // Re-render when isOpen change
  useEffect(() => {
    setOpen(isOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Re-render when isOpen change
  useEffect(() => {
    setEditId(isEdit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={title}>
        {editId ? 'CHỈNH SỬA THÔNG TIN' : 'LẬP THẺ ĐỘC GIẢ'}
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
                value={values.type}
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
        <Button onClick={handleSave}>{editId ? 'Lưu' : 'Tạo'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormCard;
