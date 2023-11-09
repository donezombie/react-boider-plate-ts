import { Fragment, Suspense } from "react";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import Page404 from "@/pages/Page404";
import routes from "@/routes/routes";

import { ErrorBoundary } from "react-error-boundary";
import PrivateRoute from "@/components/PrivateRoute";
import { Toaster } from "@/components/ui/toaster";
import AuthenticationProvider from "./providers/AuthenticationProvider";

const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const App = () => {
  //! State

  //! Function

  //! Render
  const renderContent = () => {
    return (
      <Router>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={`${route.path}-layout`}
                path={route.path}
                element={
                  route.isPrivateRoute ? (
                    <PrivateRoute>
                      <route.layout>
                        <Outlet />
                      </route.layout>
                    </PrivateRoute>
                  ) : (
                    <route.layout>
                      <Outlet />
                    </route.layout>
                  )
                }
              >
                {route.routeChild.map((child, idx) => {
                  return (
                    <Route
                      key={`${child.path}-${idx}`}
                      path={child.path}
                      element={
                        <Suspense fallback={<span>Loading...</span>}>
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

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    );
  };

  return (
    <AuthenticationProvider>
      <Toaster />
      {renderContent()}
    </AuthenticationProvider>
  );
};

export default App;
