import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authOperations, authSelectors } from '../redux/auth';
import Container from '../components/Container';
import shortid from 'shortid';
import Button from '@material-ui/core/Button';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import s from './LoginView.module.css';
import TextField from '@material-ui/core/TextField';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const isError = useSelector(authSelectors.getError);
  const isLoading = useSelector(authSelectors.getLoading);

  const onLogin = useCallback(e => dispatch(authOperations.logIn(e)), [
    dispatch,
  ]);

  const inputEmailId = shortid.generate();
  const inputPasswordId = shortid.generate();

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    switch (name) {
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

    onLogin({ email, password });

    setEmail('');
    setPassword('');
  };

  return (
    <Container>
      <div className={s.wrapper}>
        <h1 className={s.title}>Log in</h1>

        {isLoading && <Loader />}

        <Alert message={isError} />

        <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
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
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
}

// class LoginView extends Component {
//   state = {
//     email: '',
//     password: '',
//   };

//   inputEmailId = shortid.generate();
//   inputPasswordId = shortid.generate();

//   handleChange = ({ target: { name, value } }) => {
//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     this.props.onLogin(this.state);

//     this.setState({ name: '', email: '', password: '' });
//   };

//   render() {
//     const { email, password } = this.state;

//     return (
//       <Container>
//         <div className={s.wrapper}>
//           <h1 className={s.title}>Log in</h1>

//           {this.props.isLoading && <Loader />}

//           <Alert message={this.props.isError} />

//           <form
//             onSubmit={this.handleSubmit}
//             className={s.form}
//             autoComplete="off"
//           >
//             <TextField
//               className={s.label}
//               id={this.inputEmailId}
//               label="Email"
//               type="email"
//               autoComplete="current-email"
//               variant="outlined"
//               name="email"
//               value={email}
//               onChange={this.handleChange}
//             />
//             <TextField
//               className={s.label}
//               id={this.inputPasswordId}
//               label="Password"
//               type="password"
//               autoComplete="current-password"
//               variant="outlined"
//               name="password"
//               value={password}
//               onChange={this.handleChange}
//             />
//             <Button variant="contained" color="primary" type="submit">
//               Login
//             </Button>
//           </form>
//         </div>
//       </Container>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   isError: authSelectors.getError(state),
//   isLoading: authSelectors.getLoading(state),
// });

// const mapDispatchToProps = {
//   onLogin: authOperations.logIn,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
