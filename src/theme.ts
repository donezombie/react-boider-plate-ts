import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    colors?: {
      purple?: string;
      green?: string;
      red?: string;
      yellow?: string;
      blue?: string;
      white?: string;
      black?: string;
      gray?: string;
      grayLight?: string;
    };
  }
  interface ThemeOptions {
    colors?: {
      purple?: string;
      green?: string;
      red?: string;
      yellow?: string;
      blue?: string;
      white?: string;
      black?: string;
      gray?: string;
      grayLight?: string;
    };
  }
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#611f69',
    },
  },
  colors: {
    purple: '#611f69',
    green: '#2eb67d',
    red: '#e01e5a',
    yellow: '#ecb22e',
    blue: '#36c5f0',
    white: '#fff',
    black: 'rgb(18, 18, 18)',
    gray: 'rgba(0,0,0,0.4)',
    grayLight: '#F2F2F2',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  colors: {
    purple: '#611f69',
    green: '#2eb67d',
    red: '#e01e5a',
    yellow: '#ecb22e',
    blue: '#36c5f0',
    white: '#fff',
    black: 'rgb(18, 18, 18)',
    gray: '#ccc',
    grayLight: '#F2F2F2',
  },
});

const theme = (mode?: 'dark' | 'light') => (mode === 'dark' ? darkTheme : lightTheme);

export { theme };
