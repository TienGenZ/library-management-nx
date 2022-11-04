import API from '@api/index';
import { ToastProps } from '@components/ToastMessage';
import { Context } from '@context/state';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
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
  const [context, setContext] = useContext(Context);
  const [policy, setPolicy] = useState<PolicyValue>(initValue);

  const showToast = (props: ToastProps) => {
    setContext({
      ...context,
      toast: {
        isShow: true,
        ...props,
      },
    });
  };

  const handleGetPolicy = () => {
    API.get('/policy')
      .then((res) => {
        if (res?.data?.id) {
          setPolicy(res.data);
        }
      })
      .catch((error) => {
        showToast({
          severity: 'error',
          title: 'Oopps!',
          message: 'Có lỗi xảy ra - vui lòng liên hệ quản trị viên',
        });
      });
  };

  const handleCreatePolicy = (value) => {
    API.post(`/policy`, value, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        showToast({
          message: 'Thay đổi quy định thành công',
        });
      })
      .catch((error) => {
        showToast({
          severity: 'error',
          title: 'Oopps!',
          message: 'Có lỗi xảy ra - vui lòng liên hệ quản trị viên',
        });
      });
  };

  const handleUpdatePolicy = (id: number, value) => {
    API.put(`/policy/${id}`, value, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        showToast({
          message: 'Thay đổi quy định thành công',
        });
      })
      .catch((error) => {
        showToast({
          severity: 'error',
          title: 'Oopps!',
          message: 'Có lỗi xảy ra - vui lòng liên hệ quản trị viên',
        });
      });
  };

  const handleChange =
    (prop: keyof PolicyValue) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPolicy({ ...policy, [prop]: +event.target.value });
    };

  const onSave = () => {
    const { id, ...value } = policy;
    if (id) {
      handleUpdatePolicy(id, value);
    } else {
      handleCreatePolicy(value);
    }
  };

  useEffect(() => {
    handleGetPolicy();
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
