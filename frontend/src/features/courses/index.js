import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CoursesDetailPage from './page/CoursesDetailPage';
import CoursesPage from './page/CoursesPage';
const NotFoundPage = React.lazy(() => import('@components/NotFound'));

function Courses() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/:category?`} component={CoursesPage} />
      <Route
        exact
        path={`${match.url}/detail/:coursesId`}
        component={CoursesDetailPage}
      />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default Courses;
