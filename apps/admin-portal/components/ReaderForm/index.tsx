/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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
import { setAlert } from '@store/appSlice';
import {
  useCreateReaderMutation,
  useUpdateReaderMutation,
} from '@store/libraryApi';
import dayjs, { Dayjs } from 'dayjs';
import { Reader } from 'pages/reader';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  const [createReader, createResult] = useCreateReaderMutation();
  const [updateReader, updateResult] = useUpdateReaderMutation();
  const dispatch = useDispatch();
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

  const handleSave = () => {
    if (reader?.id) {
      updateReader({ id: reader.id, body: values });
    } else {
      createReader(values);
    }
  };

  useEffect(() => {
    if (createResult.isSuccess || updateResult.isSuccess) {
      dispatch(setAlert({ message: 'Thao t??c th??nh c??ng' }));
      valueChange(values as any);
      handleClose();
    }
  }, [createResult.isSuccess, updateResult.isSuccess]);

  useEffect(() => {
    if (createResult.isError || updateResult.isError) {
      const createErrorStatus = createResult?.error?.status;
      const createErrorData = createResult?.error?.data;
      const updateErrorStatus = createResult?.error?.status;
      const updateErrorData = createResult?.error?.data;

      if (createErrorStatus === 409 || updateErrorStatus === 409) {
        dispatch(
          setAlert({
            severity: 'error',
            message: 'Th??ng tin ?????c gi??? ???? t???n t???i',
          })
        );
      }
      if (createErrorStatus === 422 || updateErrorStatus === 422) {
        dispatch(
          setAlert({
            severity: 'error',
            message: createErrorData?.message || updateErrorData?.message,
          })
        );
      } else {
        dispatch(
          setAlert({
            severity: 'error',
            message: 'Thao t??c kh??ng th??nh c??ng. Vui l??ng th??? l???i',
          })
        );
      }
    }
  }, [createResult.isError, updateResult.isError]);

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
        {reader?.id ? 'CH???NH S???A TH??NG TIN' : 'L???P TH??? ?????C GI???'}
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
              H??? v?? T??n:
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
              ?????a ch???:
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
              Lo???i ?????c gi???:
            </Typography>
            <FormControl variant="standard" size="small">
              <Select
                sx={{ width: 150, fontFamily: 'Montserrat', padding: '0 10px' }}
                value={values?.type}
                onChange={handleChange('type')}
              >
                <MenuItem value={'STUDENT'}>H???c sinh</MenuItem>
                <MenuItem value={'TEACHER'}>Gi??o vi??n</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={flex}>
            <Typography variant="inherit" sx={label}>
              Ng??y sinh:
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
        <Button onClick={handleClose}>H???y</Button>
        <Button onClick={handleSave}>{reader?.id ? 'L??u' : 'T???o'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormCard;
