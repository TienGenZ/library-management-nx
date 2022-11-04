import { Box, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import React, { useState } from 'react';
interface SearchBarProps {
  defaultValue?: string;
  onChange: (value: string) => void;
}
const SearchBar = (props: SearchBarProps) => {
  const { defaultValue = '', onChange } = props;
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <Box sx={{ borderRadius: '10px', background: '#f2eaff' }}>
      <Box sx={{ display: 'flex', padding: '10px', flexDirection: 'column' }}>
        <Paper
          component="form"
          sx={{
            flex: '1',
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Tìm kiếm thông tin độc giả ..."
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default SearchBar;
