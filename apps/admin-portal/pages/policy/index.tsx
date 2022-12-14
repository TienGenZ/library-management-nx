/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { setAlert } from '@store/appSlice';
import {
  useCreatePolicyMutation,
  useGetPolicyMutation,
  useUpdatePolicyMutation,
} from '@store/libraryApi';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { formControl, input } from './styles';

export interface PolicyValue {
  id: number;
  minAge: number;
  maxAge: number;
  cardReaderDuration: number;
  bookDate: number;
  maxBooks: number;
  maxDate: number;
}

const Policy = () => {
  const initValue = {
    id: undefined,
    minAge: undefined,
    maxAge: undefined,
    cardReaderDuration: undefined,
    bookDate: undefined,
    maxBooks: undefined,
    maxDate: undefined,
  };
  const dispatch = useDispatch();
  const [policy, setPolicy] = useState<PolicyValue>(initValue);
  const [getPolicy, getPolicyResult] = useGetPolicyMutation();
  const [createPolicy, createResult] = useCreatePolicyMutation();
  const [updatePolicy, updateResult] = useUpdatePolicyMutation();

  const handleChange =
    (prop: keyof PolicyValue) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPolicy({ ...policy, [prop]: +event.target.value });
    };

  const onSave = () => {
    const { id, ...value } = policy;
    if (id) {
      updatePolicy({ id, body: value });
    } else {
      createPolicy(value);
    }
  };

  useEffect(() => {
    if (getPolicyResult.isSuccess) {
      setPolicy(getPolicyResult?.data);
    }
  }, [getPolicyResult.isSuccess]);

  useEffect(() => {
    if (createResult.isSuccess || updateResult.isSuccess) {
      dispatch(setAlert({ message: 'Thay đổi quy định thành công' }));
    }
  }, [createResult.isSuccess, updateResult.isSuccess]);

  useEffect(() => {
    if (
      createResult.isError ||
      updateResult.isError ||
      getPolicyResult.isError
    ) {
      dispatch(
        setAlert({
          severity: 'error',
          message: 'Có lỗi xảy ra vui lòng thử lại',
        })
      );
    }
  }, [createResult.isError, updateResult.isError, getPolicyResult.isError]);

  useEffect(() => {
    getPolicy(null);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        padding: '20px 20px 20px 0',
      }}
    >
      <Box
        sx={{
          background: '#fff',
          borderRadius: '10px',
          height: '100%',
          padding: '30px',
          boxShadow: 'rgb(58 53 65 / 10%) 0px 2px 10px 0px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              marginRight: '20px',
              textAlign: 'center',
              fontFamily: 'Montserrat',
            }}
          >
            QUY ĐỊNH THƯ VIỆN
          </Typography>
          <Box sx={{ marginBottom: '30px' }}>
            <Typography
              variant="inherit"
              sx={{ marginBottom: '20px', fontWeight: '600' }}
            >
              Quy định 1:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                sx={{
                  minWidth: '120px',
                }}
                variant="inherit"
              >
                Tuổi tối thiểu:
              </Typography>
              <FormControl sx={formControl}>
                <TextField
                  size="small"
                  type="number"
                  value={policy?.minAge}
                  onChange={handleChange('minAge')}
                  InputProps={{
                    sx: input,
                    inputProps: {
                      min: 0,
                    },
                  }}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                sx={{
                  minWidth: '120px',
                }}
                variant="inherit"
              >
                Tuổi tối đa:
              </Typography>
              <FormControl sx={formControl}>
                <TextField
                  size="small"
                  type="number"
                  value={policy?.maxAge}
                  onChange={handleChange('maxAge')}
                  InputProps={{
                    sx: input,
                    inputProps: {
                      min: 0,
                    },
                  }}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                sx={{
                  marginRight: '20px',
                }}
                variant="inherit"
              >
                Thời hạn thẻ (tháng):
              </Typography>
              <FormControl sx={formControl}>
                <TextField
                  size="small"
                  type="number"
                  value={policy?.cardReaderDuration}
                  onChange={handleChange('cardReaderDuration')}
                  InputProps={{
                    sx: input,
                    inputProps: {
                      min: 0,
                    },
                  }}
                />
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ marginBottom: '30px' }}>
            <Typography
              variant="inherit"
              sx={{ marginBottom: '20px', fontWeight: '600' }}
            >
              Quy định 2:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="inherit" sx={{ marginRight: '20px' }}>
                Nhận sách trong vòng (năm):
              </Typography>
              <FormControl sx={formControl}>
                <TextField
                  size="small"
                  type="number"
                  value={policy?.bookDate}
                  onChange={handleChange('bookDate')}
                  InputProps={{
                    sx: input,
                    inputProps: {
                      min: 0,
                    },
                  }}
                />
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ marginBottom: '30px' }}>
            <Typography
              variant="inherit"
              sx={{ marginBottom: '20px', fontWeight: '600' }}
            >
              Quy định 3:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="inherit" sx={{ marginRight: '20px' }}>
                Số sách mượn tối đa:
              </Typography>
              <FormControl sx={formControl}>
                <TextField
                  size="small"
                  type="number"
                  value={policy?.maxBooks}
                  onChange={handleChange('maxBooks')}
                  InputProps={{
                    sx: input,
                    inputProps: {
                      min: 0,
                    },
                  }}
                />
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="inherit" sx={{ marginRight: '20px' }}>
                Số ngày mượn tối đa:
              </Typography>
              <FormControl sx={formControl}>
                <TextField
                  size="small"
                  type="number"
                  value={policy?.maxDate}
                  onChange={handleChange('maxDate')}
                  InputProps={{
                    sx: input,
                    inputProps: {
                      min: 0,
                    },
                  }}
                />
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            margin: '10px 0',
          }}
        >
          <Button variant="contained" onClick={onSave}>
            Lưu thay đổi
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Policy;
