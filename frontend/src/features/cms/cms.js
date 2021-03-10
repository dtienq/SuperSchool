import React from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import indexRoutes from './routes/index.jsx';

import './assets/scss/material-dashboard-pro-react.css';

const hist = createBrowserHistory();

function CMS() {
  return (
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        })}
      </Switch>
    </Router>
  );
}

export default CMS;
