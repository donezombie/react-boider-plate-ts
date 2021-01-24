import { lazy } from 'react';
import withErrorBoundary from 'components/HOCs/withErrorBoundary';

const HomePage = lazy(() => import('views/Home'));
const Dashboard = lazy(() => import('views/Dashboard'));
const Page404 = lazy(() => import('views/Page404'));

export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: withErrorBoundary(Dashboard),
    isPrivate: true,
  },
  {
    path: '/',
    exact: true,
    name: 'Home',
    component: withErrorBoundary(HomePage),
    isPrivate: true,
  },
  { name: '404', component: withErrorBoundary(Page404) },
];
