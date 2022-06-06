import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default responsiveFontSizes(lightTheme);
