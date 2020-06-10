import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import { authReducerSelector } from "redux-module/selectors/auth";

const PrivateRoute = (props: any) => {
  const authReducer = useSelector(authReducerSelector);
  const { isLogin } = authReducer;

  // Render
  if (isLogin) {
    return (
      <Route {...props} />
    )
  }

  return <Redirect to="/login" />
}

export default PrivateRoute;