import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
import Button from '@material-ui/core/Button';
import defaultAvatar from './ava.jpg';
import s from './UserMenu.module.css';
import Avatar from '@material-ui/core/Avatar';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);

  const onLogOut = useCallback(() => {
    dispatch(authOperations.logOut());
  }, [dispatch]);

  return (
    <div className={s.container}>
      <Avatar alt="Avatar" src={defaultAvatar} />
      <span className={s.name}>Welcome, {name}</span>
      <Button
        variant="contained"
        color="secondary"
        type="button"
        onClick={onLogOut}
      >
        Logout
      </Button>
    </div>
  );
}
