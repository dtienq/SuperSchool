import React from 'react';
import { Route, Switch } from 'react-router-dom';
import indexRoutes from './routes/index.jsx';
import './assets/scss/material-dashboard-pro-react.css';

function CMS() {
  return (
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  );
}

export default CMS;
