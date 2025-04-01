import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Page404 from "@/pages/Page404";
import routes from "@/routes/routes";

import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";
import PrivateRoute from "@/components/PrivateRoute";
import AuthenticationProvider from "./providers/AuthenticationProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import i18n from "./i18n/config";
import Loading from "./components/ui/loading";
import SidebarProvider from "./providers/SidebarProvider";

const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

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
                        <Suspense
                          fallback={
                            <div className="p-2">
                              <Loading />
                            </div>
                          }
                        >
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
    <I18nextProvider i18n={i18n}>
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <QueryClientProvider client={queryClient}>
          <AuthenticationProvider>
            <SidebarProvider>
              {renderContent()}
              <ToastContainer />
            </SidebarProvider>
          </AuthenticationProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;
