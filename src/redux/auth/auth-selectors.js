const getIsAuthenticated = state => state.auth.isAuthenticated;
const getUserName = state => state.auth.user.name;
const getToken = state => state.auth.token;
const getLoading = state => state.auth.loading;
const getError = state => state.auth.error;

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getIsAuthenticated,
  getUserName,
  getToken,
  getLoading,
  getError,
};
