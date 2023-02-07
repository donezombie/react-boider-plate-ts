import React, { Fragment, lazy } from 'react';
import BaseUrl from 'constants/baseUrl';

// Bash importHere
const DefaultLayout = lazy(() => import('layouts/DefaultLayout'));
const Login = lazy(() => import('pages/Login'));
const Homepage = lazy(() => import('pages/Homepage'));
const Todos = lazy(() => import('pages/Todos'));

interface Route {
  name: string;
  path: string;
  layout: React.LazyExoticComponent<React.MemoExoticComponent<any>> | React.ExoticComponent<any>;
  routeChild: {
    name: string;
    path: string;
    component: React.FC;
    isPrivateRoute?: boolean;
  }[];
}

const routes: Route[] = [
  {
    name: 'Home Layout',
    path: '/',
    layout: DefaultLayout,
    routeChild: [
      // Bash appendHere
      {
        name: 'Homepage',
        path: BaseUrl.Homepage,
        component: Homepage,
      },
      {
        name: 'Todos',
        path: BaseUrl.Todos,
        component: Todos,
        isPrivateRoute: true,
      },
    ],
  },

  {
    name: 'Login Layout',
    path: BaseUrl.Login,
    layout: Fragment,
    routeChild: [
      {
        name: 'Login',
        path: BaseUrl.Login,
        component: Login,
      },
    ],
  },
];

export default routes;
