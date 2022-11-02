import BookCategory from '@components/bookCategory';
import ListBook from '@components/listBook';
import Publisher from '@components/publisher';
import { TabPanel } from '@components/tabPanel';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';

const Book = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value={0} label="Danh sách sách" />
            <Tab value={1} label="Nhà xuất bản" />
            <Tab value={2} label="Thể loại" />
          </Tabs>
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <TabPanel value={value} index={0}>
            <ListBook></ListBook>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Publisher></Publisher>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <BookCategory></BookCategory>
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default Book;
