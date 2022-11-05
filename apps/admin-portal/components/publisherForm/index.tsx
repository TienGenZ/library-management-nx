import API from '@api/index';
import { PublisherValue } from '@components/PublisherTab';
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

  const handleCreatePublisher = (values) => {
    API.post('/publisher', values, {
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

  const handleUpdatePublisher = (id: number, values) => {
    API.put(`/publisher/${id}`, values, {
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
