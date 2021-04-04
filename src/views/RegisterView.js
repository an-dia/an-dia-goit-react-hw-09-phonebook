import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../redux/auth';
import Container from '../components/Container';
import shortid from 'shortid';
import Button from '@material-ui/core/Button';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import s from './RegisterView.module.css';
import TextField from '@material-ui/core/TextField';

export default function RegisterView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const isError = useSelector(authSelectors.getError);
  const isLoading = useSelector(authSelectors.getLoading);

  const onRegister = useCallback(
    data => dispatch(authOperations.register(data)),
    [dispatch],
  );

  const inputNameId = shortid.generate();
  const inputEmailId = shortid.generate();
  const inputPasswordId = shortid.generate();

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        return;
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    onRegister({ name, email, password });
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Container>
      <div className={s.wrapper}>
        <h1 className={s.title}>Registration</h1>

        {isLoading && <Loader />}

        <Alert message={isError} />

        <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
          <TextField
            className={s.label}
            id={inputNameId}
            label="Name"
            type="name"
            autoComplete="current-password"
            variant="outlined"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <TextField
            className={s.label}
            id={inputEmailId}
            label="Email"
            type="email"
            autoComplete="current-email"
            variant="outlined"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <TextField
            className={s.label}
            id={inputPasswordId}
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
}

// const mapStateToProps = state => ({
//   isError: authSelectors.getError(state),
//   isLoading: authSelectors.getLoading(state),
// });

// const mapDispatchToProps = {
//   onRegister: authOperations.register,
// };

// одно и тоже
// const mapDispatchToProps = dispatch => ({
//   onRegister: (data) => dispatch(authOperations.register(data)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
