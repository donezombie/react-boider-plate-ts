import React, { Fragment, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "components/Footer";
import Header from "components/Header";
import routes from "routes";
import PrivateRoute from "components/PrivateRoute";

const DefaultLayout: React.FC = (props) => {
  return (
    <Fragment>
      <Header />
      <main className="main-container">
        <Suspense fallback="Loading...">
          <Switch>
            {routes.map((route: any, idx: any) => {
              if (route.isPrivate) {
                return <PrivateRoute key={idx} path={route.path} exact={route.exact} component={route.component} />;
              }

              return <Route key={idx} path={route.path} exact={route.exact} component={route.component} />;
            })}
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </Fragment>
  );
};

export default DefaultLayout;
