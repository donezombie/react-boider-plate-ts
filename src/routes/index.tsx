import { lazy } from "react";
import withErrorBoundary from "components/HOCs/withErrorBoundary";

const HomePage = lazy(() => import("views/Home"));
const Dashboard = lazy(() => import("views/Dashboard"));
const Page404 = lazy(() => import("views/Page404"));

//! Route in Default Layout
const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    isPrivate: true,
  },
  {
    path: "/",
    exact: true,
    name: "Home",
    component: HomePage,
    isPrivate: true,
  },
  { name: "404", component: Page404 },
];

const wrapRouteErrorBoundary = routes.map((route) => {
  return {
    ...route,
    component: withErrorBoundary(route.component),
  };
});

export default wrapRouteErrorBoundary;
