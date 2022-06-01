import { AppBar, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export const Header = () => (
  <AppBar sx={{ backgroundColor: '#ffffff', boxShadow: 0 }} position="relative">
    <Toolbar>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#000000',
        }}
      >
        <h1>Domain Query!</h1>
      </Box>
    </Toolbar>
  </AppBar>
);
