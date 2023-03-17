import React, { Suspense } from 'react';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';

import Page404 from 'pages/Public/Page404';
import routes from 'routes/routes';
import PrivateRoute from 'components/PrivateRoute';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { useToggleTheme } from 'providers/ToggleThemeProvider';
import { ErrorBoundary } from 'react-error-boundary';
import CommonStyles from 'components/CommonStyles';

const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const App = () => {
  //! State
  const { mode } = useToggleTheme();

  //! Function

  //! Render
  return (
    <ThemeProvider theme={theme(mode)}>
      <CssBaseline />

      <Router>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={`${route.path}-layout`}
                path={route.path}
                element={
                  <route.layout>
                    <Outlet />
                  </route.layout>
                }
              >
                {route.routeChild.map((child, idx) => {
                  return (
                    <Route
                      key={`${child.path}-${idx}`}
                      path={child.path}
                      element={
                        <Suspense fallback={<CommonStyles.Loading />}>
                          <ErrorBoundary FallbackComponent={ErrorFallback}>
                            {child.isPrivateRoute ? (
                              <PrivateRoute>
                                <child.component />
                              </PrivateRoute>
                            ) : (
                              <child.component />
                            )}
                          </ErrorBoundary>
                        </Suspense>
                      }
                    />
                  );
                })}
              </Route>
            );
          })}

          <Route path='*' element={<Page404 />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default React.memo(App);
