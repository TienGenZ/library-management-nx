/* eslint-disable react-hooks/exhaustive-deps */
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
import { setAlert } from '@store/appSlice';
import {
  useCreatePublisherMutation,
  useUpdatePublisherMutation,
} from '@store/libraryApi';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  const [createPublisher, createResult] = useCreatePublisherMutation();
  const [updatePublisher, updateResult] = useUpdatePublisherMutation();
  const dispatch = useDispatch();

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

  const handleSave = () => {
    if (publisher?.id) {
      updatePublisher({ id: publisher.id, body: values });
    } else {
      createPublisher(values);
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
          setAlert({ severity: 'error', message: 'Nhà xuất bản đã tồn tại' })
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
    setPublisher(publisherEdit);

    if (publisherEdit?.id) {
      const { name } = publisherEdit;
      setValues({ name });
    }
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
