import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import routes from './routes';
import PrivateRoute from 'components/PrivateRoute';
import './scss/styles.scss';


function App() {

  // RENDER
  return (
    <Router>
      <Switch>
        {routes.map(route => (
          route.isPrivate
          ? <PrivateRoute key={route.path} path={route.path} component={route.component} exact={route.exact} />
          : <Route key={route.path} path={route.path} component={route.component} exact={route.exact} />
        ))}
        <Route component={() => <div>404 Not Found!</div>} />
      </Switch>
    </Router>
  )
  
}

export default App;
