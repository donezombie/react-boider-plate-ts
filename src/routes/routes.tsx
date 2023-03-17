import React, { Fragment, lazy } from 'react';
import BaseUrl from 'consts/baseUrl';
import withCheckRole from 'HOCs/withCheckRole';
import { PERMISSION_ENUM } from 'consts/index';

// Bash importHere
const DefaultLayout = lazy(() => import('layouts/DefaultLayout'));
const Login = lazy(() => import('pages/Public/Login'));
const Apps = lazy(() => import('pages/User/Apps'));
const Callbacks = lazy(() => import('pages/Public/Callbacks'));

const AppManagement = lazy(() => import('pages/Admin/AppManagement'));

interface Route {
  name: string;
  path: string;
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
    name: 'Home Layout',
    path: '/',
    layout: DefaultLayout,
    routeChild: [
      // Bash appendHere
      {
        name: 'Homepage',
        path: BaseUrl.Homepage,
        component: withCheckRole(Apps, [PERMISSION_ENUM.PUBLIC]),
        isPrivateRoute: true,
      },
      {
        name: 'AppManagement',
        path: BaseUrl.AppManagement,
        component: withCheckRole(AppManagement, [PERMISSION_ENUM.PUBLIC]),
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

  {
    name: 'Callbacks Layout',
    path: BaseUrl.Callbacks,
    layout: Fragment,
    routeChild: [
      {
        name: 'Callbacks',
        path: BaseUrl.Callbacks,
        component: Callbacks,
      },
    ],
  },
];

export default routes;
