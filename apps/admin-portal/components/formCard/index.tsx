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

export interface CardValue {
  fullName: string;
  email: string;
  address: string;
  type: 'student' | 'teacher';
  dob: string;
}

interface FormCardProps {
  isEdit: boolean;
  isOpen: boolean;
  onClose: (value: boolean) => void;
  valueChange: (value: CardValue) => void;
}

const FormCard = (props: FormCardProps) => {
  const { isEdit = false, isOpen = false, onClose, valueChange } = props;
  const initialValue: CardValue = {
    fullName: '',
    email: '',
    address: '',
    type: 'student',
    dob: '',
  };
  const [open, setOpen] = useState(isOpen);
  const [edit, setEdit] = useState(isEdit);
  const [values, setValues] = useState(initialValue);

  const handleClose = () => {
    setOpen(false);
    onClose(false);
  };

  const handleChange =
    (prop: keyof CardValue) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleSave = () => {
    valueChange(values);
  };
  // Re-render when isOpen change
  useEffect(() => {
    setOpen(isOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Re-render when isOpen change
  useEffect(() => {
    setEdit(isEdit);
    console.log(`Ahuhuhiohi: ${isEdit}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={title}>
        {isEdit ? 'CHỈNH SỬA THÔNG TIN' : 'LẬP THẺ ĐỘC GIẢ'}
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
                onChange={handleChange('fullName')}
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
                <MenuItem value={'student'}>Học sinh</MenuItem>
                <MenuItem value={'teacher'}>Giáo viên</MenuItem>
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
        <Button onClick={handleSave}>{isEdit ? 'Lưu' : 'Tạo'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormCard;
