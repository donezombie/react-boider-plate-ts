import { Navigate } from "react-router-dom";
import BaseUrl from "@/consts/baseUrl";
import { useAuth } from "@/providers/AuthenticationProvider";

const PrivateRoute = (props: { children: any }) => {
  const auth = useAuth();

  //! Render
  if (auth.isLogged) {
    return props.children;
  }

  return <Navigate to={BaseUrl.Login} replace />;
};

export default PrivateRoute;
