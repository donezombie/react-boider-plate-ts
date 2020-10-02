import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './scss/styles.scss';
import SecureRoute from 'routes/SecureRoute';
import PrivateRoute from 'components/PrivateRoute';
import { RouteBase } from 'constants/routeUrl';
import LoginPage from 'views/Login';

const App: React.FC = () => {

  // RENDER
  return (
    <Router>
      <Switch>
        <Route path={RouteBase.Login} exact component={LoginPage} />
        <PrivateRoute path="/" component={SecureRoute} />
      </Switch>
    </Router>
  )
  
}

export default App;
