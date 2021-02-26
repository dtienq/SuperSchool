import userApi from '@api/userApi';
import { checkLogin } from '@app/userSlice';
import LoadingScreen from '@components/LoadingScreen';
import CMS from '@features/cms/cms';
import HomePage from '@features/home/HomePage';
import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';
const NotFoundPage = React.lazy(() => import('@components/NotFound'));
const CoursesPage = React.lazy(() => import('@features/courses'));
const LoginPage = React.lazy(() => import('@features/auth/login'));
const RegisterPage = React.lazy(() => import('@features/auth/register'));

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const CheckLogin = async () => {
      setLoading(true);
      const currentUser = await userApi.checkLogin();
      if (currentUser?.isLogin) {
        dispatch(checkLogin(currentUser));
      }
      setLoading(false);
    };
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined') CheckLogin();
  }, [dispatch]);
  return (
    <Spin spinning={loading}>
      <Suspense fallback={<LoadingScreen />}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/courses" exact component={CoursesPage} />
            <Route path="/manager">
              <CMS />
            </Route>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </Spin>
  );
}

export default App;
