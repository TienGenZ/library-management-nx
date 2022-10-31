import { Box } from '@mui/material';
import React, { useState } from 'react';

const Exchange = () => {
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
      ></Box>
    </Box>
  );
};

export default Exchange;
