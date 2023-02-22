import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const theme = (mode?: 'dark' | 'light') => (mode === 'dark' ? darkTheme : lightTheme);

export { theme };
