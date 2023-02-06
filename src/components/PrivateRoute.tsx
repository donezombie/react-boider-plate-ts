import React from "react";
import { Navigate } from "react-router-dom";
import BaseUrl from "constants/baseUrl";
import { useAuthentication } from "providers/AuthenticationProvider";

const PrivateRoute = (props: { children: any }) => {
  const { isLogged } = useAuthentication() as any;

  //! Render
  if (isLogged) {
    return props.children;
  }

  return <Navigate to={BaseUrl.Login} replace />;
};

export default PrivateRoute;
