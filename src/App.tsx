import React from 'react';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';

import { Suspense } from 'react';
import Page404 from 'pages/Page404';
import routes from 'routes/routes';
import PrivateRoute from 'components/PrivateRoute';

interface AppProps {}

const App = (props: AppProps) => {
  //! State

  //! Function

  //! Render
  return (
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
                        child.isPrivateRoute ? (
                          <PrivateRoute>
                            <child.component />
                          </PrivateRoute>
                        ) : (
                          <child.component />
                        )
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
  );
};

export default React.memo(App);
