import React, { ChangeEventHandler } from 'react';
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const SearchBar = (props: SearchBarProps) => {
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
            inputProps={{ 'aria-label': 'search reader' }}
            onChange={props.onChange}
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
