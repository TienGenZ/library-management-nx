import API from '@api/index';
import { PublisherValue } from '@components/publisher';
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
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { flex, formControl, input, label, title } from './styles';

interface FormCardProps {
  publisherEdit?: PublisherValue;
  isOpen: boolean;
  onClose: (value: boolean) => void;
  valueChange: (value: PublisherValue) => void;
}

const PublisherForm = (props: FormCardProps) => {
  const { publisherEdit, isOpen = false, onClose, valueChange } = props;
  const initialValue = { name: '' };

  const [open, setOpen] = useState(isOpen);
  const [publisher, setPublisher] = useState(publisherEdit);
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
    setPublisher(null);
    setValues(initialValue);
  };

  const handleChange =
    (prop: keyof PublisherValue) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleCreatePublisher = (values) => {
    API.post('/publisher', values, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        showToast({
          message: 'Thêm nhà xuất bản thành công',
        });
        valueChange(values);
        handleClose();
      })
      .catch((error) => {
        showToast({
          severity: 'error',
          title: 'Oopps!',
          message: 'Thêm nhà xuất bản không thành công',
        });
        console.log(error);
      });
  };

  const handleUpdatePublisher = (id: number, values) => {
    API.put(`/publisher/${id}`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        showToast({
          message: 'Chỉnh sửa nhà xuất bản thành công',
        });
        valueChange(values);
        handleClose();
      })
      .catch((error) => {
        showToast({
          severity: 'error',
          title: 'Oopps!',
          message: 'Chỉnh sửa nhà xuất bản không thành công',
        });
        console.log(error);
      });
  };

  const handleSave = () => {
    if (publisher?.id) {
      handleUpdatePublisher(publisher.id, values);
    } else {
      handleCreatePublisher(values);
    }
  };

  // Re-render when isOpen change
  useEffect(() => {
    setOpen(isOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Re-render when isOpen change
  useEffect(() => {
    setPublisher(publisherEdit);

    if (publisherEdit?.id) {
      const { name } = publisherEdit;
      setValues({ name });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publisherEdit]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={title}>
        {publisher?.id ? 'CHỈNH SỬA NHÀ XUẤT BẢN' : 'THÊM NHÀ XUẤT BẢN'}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            minWidth: '500px',
          }}
        >
          <Box sx={flex}>
            <Typography variant="inherit" sx={label}>
              Nhà xuất bản:
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
        <Button onClick={handleSave}>{publisher?.id ? 'Lưu' : 'Tạo'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PublisherForm;
