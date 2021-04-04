import React, { Suspense, lazy, useEffect } from 'react';
import { Switch } from 'react-router';
import { useDispatch } from 'react-redux';
import { authOperations } from './redux/auth';
import MainAppBar from './components/AppBar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import LoaderSpinner from './components/Loader';

const HomeView = lazy(() =>
  import('./views/HomeView' /* webpackChunkName: "home-view" */),
);
const RegisterView = lazy(() =>
  import('./views/RegisterView' /* webpackChunkName: "register-view" */),
);
const LoginView = lazy(() =>
  import('./views/LoginView' /* webpackChunkName: "login-view" */),
);
const ContactsView = lazy(() =>
  import('./views/ContactsView' /* webpackChunkName: "contacts-view" */),
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <MainAppBar />
      <Suspense fallback={<LoaderSpinner />}>
        <Switch>
          <PublicRoute exact path="/">
            <HomeView />
          </PublicRoute>
          <PublicRoute path="/register" restricted redirectTo={'/contacts'}>
            <RegisterView />
          </PublicRoute>
          <PublicRoute path="/login" restricted redirectTo={'/contacts'}>
            <LoginView />
          </PublicRoute>
          <PrivateRoute path="/contacts" redirectTo={'/login'}>
            <ContactsView />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </>
  );
}
