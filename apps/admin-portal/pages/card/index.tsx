import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const Card = () => {
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
        }}
      >
        <Box>
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: '500',
                color: '#454545',
                textAlign: 'center',
              }}
            >
              THẺ ĐỘC GIẢ
            </Typography>
          </Box>
          {/* Form start */}
          <Box>
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Typography
                variant="inherit"
                sx={{
                  marginTop: '2px',
                  fontWeight: '500',
                  color: '#454545',
                  marginRight: '20px',
                }}
              >
                Họ và Tên:
              </Typography>
              <FormControl
                sx={{
                  flex: '1',
                  marginBottom: '10px',
                  display: 'flex',
                }}
              >
                <TextField
                  variant="standard"
                  size="small"
                  type="text"
                  onChange={(value) => console.log(value)}
                  InputProps={{
                    sx: {
                      '& ::placeholder': {
                        fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
                        color: '#000 !important',
                      },
                      fontWeight: '500',
                    },
                  }}
                />
              </FormControl>
            </Box>

            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Typography
                variant="inherit"
                sx={{
                  marginTop: '2px',
                  fontWeight: '500',
                  color: '#454545',
                  marginRight: '20px',
                }}
              >
                Email:
              </Typography>
              <FormControl
                sx={{
                  flex: '1',
                  marginBottom: '10px',
                  display: 'flex',
                }}
              >
                <TextField
                  variant="standard"
                  size="small"
                  type="text"
                  onChange={(value) => console.log(value)}
                  InputProps={{
                    sx: {
                      '& ::placeholder': {
                        fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
                        color: '#000 !important',
                      },
                      fontWeight: '500',
                    },
                  }}
                />
              </FormControl>
            </Box>

            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Typography
                variant="inherit"
                sx={{
                  marginTop: '2px',
                  fontWeight: '500',
                  color: '#454545',
                  marginRight: '20px',
                }}
              >
                Địa chỉ:
              </Typography>
              <FormControl
                sx={{
                  flex: '1',
                  marginBottom: '10px',
                  display: 'flex',
                }}
              >
                <TextField
                  variant="standard"
                  size="small"
                  type="text"
                  onChange={(value) => console.log(value)}
                  InputProps={{
                    sx: {
                      '& ::placeholder': {
                        fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
                        color: '#000 !important',
                      },
                      fontWeight: '500',
                    },
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
              <Typography
                variant="inherit"
                sx={{
                  marginTop: '2px',
                  fontWeight: '500',
                  color: '#454545',
                  marginRight: '20px',
                }}
              >
                Loại độc giả:
              </Typography>
              <FormControl variant="standard" size="small">
                <Select
                  sx={{ width: 150 }}

                  // value={0}
                  // onChange={handleChange}
                >
                  <MenuItem value={0}>Học sinh</MenuItem>
                  <MenuItem value={1}>Giáo viên</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Typography
                variant="inherit"
                sx={{
                  marginTop: '2px',
                  fontWeight: '500',
                  color: '#454545',
                  marginRight: '20px',
                }}
              >
                Địa chỉ:
              </Typography>
              <FormControl
                sx={{
                  flex: '1',
                  marginBottom: '10px',
                  display: 'flex',
                }}
              >
                <TextField
                  variant="standard"
                  size="small"
                  id="date"
                  type="date"
                  defaultValue="2017-05-24"
                  sx={{ width: 150 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
