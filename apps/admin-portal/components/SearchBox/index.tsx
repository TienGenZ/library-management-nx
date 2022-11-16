import React, { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onClickIcon?: () => void
  placeHolder: string,
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <Box sx={{ borderRadius: '10px', background: '#f2eaff', marginTop: '10px' }}>
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
            placeholder={props.placeHolder}
            inputProps={{ 'aria-label': 'search reader' }}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={props.onClickIcon}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default SearchBar;
