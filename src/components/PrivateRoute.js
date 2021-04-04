import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../redux/auth';

/**
 * - Если маршрут приватный и пользователь залогинен, рендерит компонент
 * - В противном случае рендерит Redirect на /login
 */
export default function PrivateRoute({ redirectTo, children, ...routeProps }) {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);
  const token = useSelector(authSelectors.getToken);
  return (
    <Route {...routeProps}>
      {isLoggedIn || token ? children : <Redirect to={redirectTo} />}
    </Route>
  );
}

// const mapStateToProps = state => ({
//   // isAuthenticated: authSelectors.getIsAuthenticated(state),
//   token: authSelectors.getToken(state),
// });

// isAuthenticated
