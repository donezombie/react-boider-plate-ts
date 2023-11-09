import React, { Fragment, lazy } from 'react';
import BaseUrl from '@/consts/baseUrl';
import withCheckRole from '@/HOCs/withCheckRole';
import { PERMISSION_ENUM } from '@/consts/common';

// Bash importHere
const DefaultLayout = lazy(() => import('@/layouts/DefaultLayout'));
const Login = lazy(() => import('@/pages/Login'));
const Homepage = lazy(() => import('@/pages/Homepage'));
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
    name: 'Home Layout',
    path: BaseUrl.Homepage,
    layout: DefaultLayout,
    isPrivateRoute: true,
    routeChild: [
      // Bash appendHere
      {
        name: 'Homepage',
        path: BaseUrl.Homepage,
        component: withCheckRole(Homepage, [PERMISSION_ENUM.PUBLIC]),
      },
    ],
  },
];

export default routes;