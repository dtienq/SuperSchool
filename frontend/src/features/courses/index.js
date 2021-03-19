import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CoursesDetailPage from './page/CoursesDetailPage';
import CoursesPage from './page/CoursesPage';
const LikeCoursesPage = React.lazy(()=>import('./page/LikeCoursesPage'))
const EnrollCoursesPage = React.lazy(()=>import('./page/EnrollCoursesPage'))
const NotFoundPage = React.lazy(() => import('@components/NotFound'));

function Courses() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url} component={CoursesPage} />
      <Route path="/courses/like" component={LikeCoursesPage} />
      <Route path="/courses/enroll" component={EnrollCoursesPage} />
      <Route path={`/courses/category/:categoryId?`} component={CoursesPage} />
      <Route
        exact
        path={`/courses/detail/:coursesId`}
        component={CoursesDetailPage}
      />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default Courses;
