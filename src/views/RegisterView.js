import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authOperations, authSelectors } from '../redux/auth';
import Container from '../components/Container';
import shortid from 'shortid';
import Button from '@material-ui/core/Button';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import s from './RegisterView.module.css';
import TextField from '@material-ui/core/TextField';

class RegisterView extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  inputNameId = shortid.generate();
  inputEmailId = shortid.generate();
  inputPasswordId = shortid.generate();

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onRegister(this.state);

    this.setState({ name: '', email: '', password: '' });
  };

  render() {
    const { name, email, password } = this.state;

    return (
      <Container>
        <div className={s.wrapper}>
          <h1 className={s.title}>Registration</h1>

          {this.props.isLoading && <Loader />}

          <Alert message={this.props.isError} />

          <form
            onSubmit={this.handleSubmit}
            className={s.form}
            autoComplete="off"
          >
            <TextField
              className={s.label}
              id={this.inputNameId}
              label="Name"
              type="name"
              autoComplete="current-password"
              variant="outlined"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
            <TextField
              className={s.label}
              id={this.inputEmailId}
              label="Email"
              type="email"
              autoComplete="current-email"
              variant="outlined"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <TextField
              className={s.label}
              id={this.inputPasswordId}
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isError: authSelectors.getError(state),
  isLoading: authSelectors.getLoading(state),
});

const mapDispatchToProps = {
  onRegister: authOperations.register,
};

// одно и тоже
// const mapDispatchToProps = dispatch => ({
//   onRegister: (data) => dispatch(authOperations.register(data)),
// });

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
