import HomePage from '@features/home';
import CMS from '@features/cms/cms';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoadingScreen from '@components/LoadingScreen';

const NotFoundPage = React.lazy(() => import('@components/NotFound'));
const CoursesPage = React.lazy(() => import('@features/courses'));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/courses" exact component={CoursesPage} />
          <Route path="/manager">
            <CMS />
          </Route>
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
