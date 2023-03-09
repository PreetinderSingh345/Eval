const AUTH_URL = 'http://localhost:5000';
const BACKEND_URL = 'http://localhost:4000';

const SIGNUP = {
  url: '/user',
  method: 'POST',
};

const LOGIN = {
  url: '/login',
  method: 'POST',
};

const GET_EMPLOYEE_BY_ID = (employeeId) => ({
  url: `/employee/${employeeId}`,
  method: 'GET',
});

module.exports = {
  AUTH_URL,
  BACKEND_URL,
  SIGNUP,
  LOGIN,
  GET_EMPLOYEE_BY_ID,
};
