import axios from 'axios';
import authActions from './auth-actions';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

//POST '/users/signup'
//credentials - body {name,email.password}
//После успешной регистрации добавляем токен в HTTP-заголовок

const register = credentials => async dispatch => {
  dispatch(authActions.registerRequest());

  try {
    const response = await axios.post('/users/signup', credentials);
    console.log('response.data', response.data);

    token.set(response.data.token);
    dispatch(authActions.registerSuccess(response.data));
  } catch (error) {
    dispatch(authActions.registerError(error.message));
  }
};

// POST @ /users/login
// body:
//   { email, password }

//  После успешного логина добавляем токен в HTTP-заголовок

const logIn = credentials => async dispatch => {
  dispatch(authActions.loginRequest());

  try {
    const response = await axios.post('/users/login', credentials);
    console.log('response111', response);
    token.set(response.data.token);
    dispatch(authActions.loginSuccess(response.data));
  } catch (error) {
    dispatch(authActions.loginError(error.message));
  }
};

// POST @ /users/logout - отправляем заголовок авторизации
// (явно не передаём, потомучто при логине или регистрации мы его засетили)
// headers:
//   Authorization: Bearer token

// 1. После успешного логаута, удаляем токен из HTTP-заголовка

const logOut = () => async dispatch => {
  dispatch(authActions.logoutRequest());

  try {
    await axios.post('/users/logout');

    token.unset();
    //данные никакие не передаём, это чтобы очистить state
    // (сбросить в начальное состояние)
    dispatch(authActions.logoutSuccess());
  } catch (error) {
    dispatch(authActions.logoutError(error.message));
  }
};

// GET @ /users/current
// headers:
//    Authorization: Bearer token

// 1. Забираем токен из стейта через getState()
// 2. Если токена нет, выходим не выполняя никаких операций
// 3. Если токен есть, добавляет его в HTTP-заголовок и выполянем операцию

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);

  dispatch(authActions.getCurrentUserRequest());

  try {
    const response = await axios.get('/users/current');

    dispatch(authActions.getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(authActions.getCurrentUserError(error.message));
  }
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { register, logIn, logOut, getCurrentUser };
