import React from 'react';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../redux/auth';
import s from './AppBar.module.css';
import Navigation from '../Navigation';
import UserMenu from '../UserMenu';
import AuthNav from '../AuthNav';
import AppBar from '@material-ui/core/AppBar';
import Container from '../Container';

export default function MainAppBar() {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);

  return (
    <AppBar position="static">
      <Container>
        <div className={s.wrapper}>
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </div>
      </Container>
    </AppBar>
  );
}
