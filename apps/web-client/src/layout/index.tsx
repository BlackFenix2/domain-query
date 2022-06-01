import { Box, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

const themeOptions = {
  palette: {
    primary: {
      main: '#1e76ba',
    },
  },
};

const theme = createTheme(themeOptions);

interface Props {
  children: React.ReactNode;
}

const index: React.FC<Props> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Box sx={{ background: '#F6F4F4' }} display="flex" flex={1} flexDirection="column" minHeight="100vh">
      <Header />
      <Box flex={1}>
        <main>{children}</main>
      </Box>
      <Footer />
    </Box>
  </ThemeProvider>
);

export default index;
