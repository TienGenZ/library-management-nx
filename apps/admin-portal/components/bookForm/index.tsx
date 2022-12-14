/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dayjs } from 'dayjs';
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { setAlert } from '@store/appSlice';
import {
  useCreateBookMutation,
  useGetAllBookTypeMutation,
  useGetAllPublisherMutation,
  useGetPolicyMutation,
  useUpdateBookMutation,
} from '@store/libraryApi';
import { flex, formControl, input, label, MenuProps, title } from './styles';

export interface BookFormValue {
  name: string;
  author: string;
  bookTypeId: number;
  publisherId: number;
  publishedAt: string;
  receivingDate: Dayjs;
}

interface BookFormProps {
  bookEdit?: Book;
  isOpen: boolean;
  onClose: (value: boolean) => void;
  valueChange: (value: BookFormValue) => void;
}

const BookForm = (props: BookFormProps) => {
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const { bookEdit, isOpen = false, onClose, valueChange } = props;
  const initialValue: Omit<BookFormValue, 'receivingDate'> = {
    name: '',
    author: '',
    bookTypeId: null,
    publisherId: null,
    publishedAt: '',
  };
  const [years, setYears] = useState([]);
  const [open, setOpen] = useState(isOpen);
  const [book, setBook] = useState(bookEdit);
  const [values, setValues] = useState(initialValue);
  const [bookTypes, setBookTypes] = useState<BookType[]>([]);
  const [publishers, setPublishers] = useState<PublisherValue[]>([]);
  const [createBook, createResult] = useCreateBookMutation();
  const [updateBook, updateResult] = useUpdateBookMutation();
  const [getBookType, getBookTypeResult] = useGetAllBookTypeMutation();
  const [getPublisher, getPublisherResult] = useGetAllPublisherMutation();
  const [getPolicy, getPolicyResult] = useGetPolicyMutation();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    onClose(false);
    setBook(null);
    setValues(initialValue);
    setDateValue(null);
  };

  const handleChange =
    (prop: keyof BookFormValue) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleDateChange = (newValue: Dayjs | null) => {
    setDateValue(newValue);
  };

  const handleSave = () => {
    const { bookTypeId, publisherId, publishedAt, name, author } = values;
    if (book?.id) {
      updateBook({
        id: book.id,
        body: {
          bookTypeId,
          publisherId,
          publishedAt,
          name,
          author,
          receivingDate: dateValue,
        },
      });
    } else {
      createBook({ ...values, receivingDate: dateValue });
    }
  };

  useEffect(() => {
    setOpen(isOpen);
    if (isOpen) {
      getBookType(null);
      getPublisher(null);
      getPolicy(null);
    }
  }, [isOpen]);

  useEffect(() => {
    setBook(bookEdit);

    if (bookEdit?.id) {
      setValues(bookEdit);
      setDateValue(bookEdit.receivingDate);
    }
  }, [bookEdit]);

  useEffect(() => {
    if (getPublisherResult.isSuccess) {
      setPublishers(getPublisherResult?.data);
    }
  }, [getPublisherResult.isSuccess]);

  useEffect(() => {
    if (getBookTypeResult.isSuccess) {
      setBookTypes(getBookTypeResult?.data);
    }
  }, [getBookTypeResult.isSuccess]);

  useEffect(() => {
    if (createResult.isSuccess || updateResult.isSuccess) {
      dispatch(setAlert({ message: 'Thao t??c th??nh c??ng' }));
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
          setAlert({ severity: 'error', message: 'Th??ng tin s??ch ???? t???n t???i' })
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

  useEffect(() => {
    if (getPolicyResult.isSuccess) {
      const result: number[] = [];
      const currentYear: number = new Date().getFullYear();
      for (let i = 0; i <= getPolicyResult.data.bookDate; i++) {
        result.push(currentYear - i);
      }
      setYears(result);
    }

    if (getPolicyResult.isError) {
      dispatch(
        setAlert({
          serverity: 'error',
          message: 'Kh??ng t???i ???????c quy ?????nh. Vui l??ng th??? l???i sau. ',
        })
      );
    }
  }, [getPolicyResult.isSuccess, getPolicyResult.isError]);

  return (
    <Dialog maxWidth="xl" open={open} onClose={handleClose}>
      <DialogTitle sx={title}>
        {bookEdit?.id ? 'CH???NH S???A TH??NG TIN S??CH' : 'TH??M S??CH'}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            minWidth: '700px',
          }}
        >
          <Box sx={flex}>
            <Typography variant="inherit" sx={label}>
              T??n s??ch:
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
              T??c gi???:
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
              N??m xu???t b???n:
            </Typography>
            <FormControl sx={formControl}>
              <Select
                variant="standard"
                size="small"
                value={values?.publishedAt}
                label="Age"
                onChange={handleChange('publishedAt')}
                MenuProps={MenuProps}
                sx={{ paddingLeft: '10px' }}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
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
              Th??? lo???i:
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
              Nh?? xu???t b???n:
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
          <Box
            sx={{
              display: 'flex',
              marginBottom: '20px',
            }}
          >
            <Typography variant="inherit" sx={label}>
              Ng??y nh???p:
            </Typography>
            <FormControl sx={{ flex: 1 }} variant="standard" size="small">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="MM/DD/YYYY"
                  value={dateValue}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                >
                  {publishers.map((publisher) => (
                    <MenuItem key={publisher.id} value={publisher.id}>
                      {publisher.name}
                    </MenuItem>
                  ))}
                </DesktopDatePicker>
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>H???y</Button>
        <Button onClick={handleSave}>{book?.id ? 'L??u' : 'T???o'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookForm;
