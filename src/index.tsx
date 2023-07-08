import App from 'App';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n';

import './index.css';
import './styles/temp.scss';
import ToggleThemeProvider from 'providers/ToggleThemeProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthenticationProvider from 'providers/AuthenticationProvider';
import { GlobalStyles } from '@mui/material';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <AuthenticationProvider>
        <ToggleThemeProvider>
          <GlobalStyles
            styles={{
              a: {
                textDecoration: 'none',
              },
            }}
          />
          <App />
          <ToastContainer theme='light' />
        </ToggleThemeProvider>
      </AuthenticationProvider>
    </I18nextProvider>
  </QueryClientProvider>
);
