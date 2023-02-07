import App from 'App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthProvider from 'providers/AuthenticationProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const queryClient = new QueryClient();

import './index.css';
import './styles/temp.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
