import React from 'react';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';

import { Suspense } from 'react';
import Page404 from 'pages/Page404';
import routes from 'routes/routes';
import PrivateRoute from 'components/PrivateRoute';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { useToggleTheme } from 'providers/ToggleThemeProvider';
import ErrorBoundary from 'components/ErrorBoundary';

interface AppProps {}

const App = (props: AppProps) => {
  //! State
  const { mode } = useToggleTheme();

  //! Function

  //! Render
  return (
    <ThemeProvider theme={theme(mode)}>
      <CssBaseline />

      <Suspense fallback='Loading...'>
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
                        key={idx}
                        path={child.path}
                        element={
                          <ErrorBoundary>
                            {child.isPrivateRoute ? (
                              <PrivateRoute>
                                <child.component />
                              </PrivateRoute>
                            ) : (
                              <child.component />
                            )}
                          </ErrorBoundary>
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
      </Suspense>
    </ThemeProvider>
  );
};

export default React.memo(App);
