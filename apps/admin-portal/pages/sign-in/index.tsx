/* eslint-disable react-hooks/exhaustive-deps */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { setAlert, setAuthorized, setUser } from '@store/appSlice';
import { useSignInMutation } from '@store/libraryApi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  inputPassword,
  inputUsername,
  rememberCheckbox,
  submitButton,
} from './style';

interface User {
  username: string;
  password: string;
}

const SignIn = () => {
  const dispatch = useDispatch();
  const [signIn, result] = useSignInMutation();
  const { data, error, isSuccess, isError, isLoading } = result;
  const [values, setValues] = useState<User>({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const handleChange =
    (prop: keyof User) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickRemember = () => {
    setRemember(!remember);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuthorized(true));
      dispatch(setUser(data));
      dispatch(setAlert({ message: 'Đăng nhập thành công' }));
      router.push('/reader');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      dispatch(setAuthorized(false));
      if ('status' in error && error.status === 500) {
        dispatch(
          setAlert({
            severity: 'error',
            title: 'Oops!',
            message: 'Có lỗi xảy ra - vui lòng liên hệ với quản trị viên',
          })
        );
      } else {
        dispatch(
          setAlert({
            severity: 'error',
            message: 'Thông tin tài khoản không chính xác',
          })
        );
      }
    }
  }, [isError]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        background: '#fbfbfb',
      }}
    >
      <Box
        sx={{
          width: '700px',
          height: '500px',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '10px',
          overflow: 'hidden',
          background: 'rgb(251, 251, 251)',
          boxShadow:
            '0 0 #0000, 0 0 #0000, 0 10px 15px 3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            padding: '0 30px',
            height: '100%',
            background: '#e0dbc7',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: '700',
              color: '#454545',
            }}
          >
            Library Management
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              fontWeight: '500',
              color: '#454545',
            }}
          >
            By: Thu Mai
          </Typography>
          <Image
            src="/imgs/person.png"
            alt="Picture of the author"
            width="258px"
            height="300px"
          />
        </Box>

        <Box
          sx={{
            flex: '1',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: '700',
              color: '#454545',
              marginBottom: '40px',
            }}
          >
            Sign In
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signIn(values);
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <FormControl
                sx={{
                  marginBottom: '10px',
                }}
                variant="outlined"
              >
                <TextField
                  required
                  sx={{
                    border: '1px solid rgb(90, 34, 139)',
                    '& fieldset': { border: 'none' },
                  }}
                  placeholder="Username"
                  size="small"
                  type="text"
                  value={values.username}
                  onChange={handleChange('username')}
                  InputProps={{
                    sx: inputUsername,
                  }}
                />
              </FormControl>
              <FormControl
                sx={{
                  marginBottom: '5px',
                }}
                variant="outlined"
              >
                <TextField
                  required
                  id="password"
                  sx={inputPassword}
                  placeholder="Password"
                  size="small"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  InputProps={{
                    sx: {
                      fontFamily: 'Montserrat',
                      fontWeight: '500',
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px',
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={rememberCheckbox}
                      checked={remember}
                      onChange={handleClickRemember}
                    />
                  }
                  label="Remember me"
                  labelPlacement="end"
                />
                {/* <Link href="/reset-password">
                <p>Forgot password</p>
              </Link> */}
              </Box>
              <LoadingButton
                variant="contained"
                type="submit"
                sx={submitButton}
                loading={isLoading}
                loadingPosition="end"
              >
                Sign In
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
