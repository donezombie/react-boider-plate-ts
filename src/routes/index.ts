import HomePage from 'views/Home';
import Login from 'views/Login';

export default [
  {
    path: '/',
    component: HomePage,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/login',
    component: Login,
  }
]