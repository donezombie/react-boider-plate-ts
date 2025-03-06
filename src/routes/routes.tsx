import React, { Fragment, lazy } from "react";
import BaseUrl from "@/consts/baseUrl";

// Bash importHere
const DefaultLayout = lazy(() => import("@/layouts/DefaultLayout"));
const Login = lazy(() => import("@/pages/Login"));
const Homepage = lazy(() => import("@/pages/Homepage"));
const ChangePassword = lazy(() => import("@/pages/ChangePassword"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));

interface Route {
  name: string;
  path: string;
  isPrivateRoute?: boolean;
  layout:
    | React.LazyExoticComponent<React.MemoExoticComponent<any>>
    | React.ExoticComponent<any>
    | typeof React.Component;
  routeChild: {
    name: string;
    path: string;
    component: typeof React.Component | React.FC;
    isPrivateRoute?: boolean;
  }[];
}

const routes: Route[] = [
  {
    name: "Login Layout",
    path: BaseUrl.Login,
    layout: Fragment,
    routeChild: [
      {
        name: "Login",
        path: BaseUrl.Login,
        component: Login,
      },
    ],
  },
  {
    name: "Forgot Password",
    path: BaseUrl.ForgotPassword,
    layout: Fragment,
    routeChild: [
      {
        name: "Forgot Password",
        path: BaseUrl.ForgotPassword,
        component: ForgotPassword,
      },
    ],
  },

  {
    name: "Home Layout",
    path: BaseUrl.Homepage,
    layout: DefaultLayout,
    isPrivateRoute: true,
    routeChild: [
      // Bash appendHere
      {
        name: "Homepage",
        path: BaseUrl.Homepage,
        component: Homepage,
      },
      {
        name: "Change Password",
        path: BaseUrl.ChangePassword,
        component: ChangePassword,
      },
    ],
  },
];

export default routes;
