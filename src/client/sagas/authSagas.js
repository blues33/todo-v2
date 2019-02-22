import {
  take, takeEvery, call, put, fork
} from 'redux-saga/effects';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';

import {
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_LOGIN,
  USER_SET,
  ERRORS_GET
} from '../actions/types';

// Register flow
function* registerUser(action) {
  try {
    const res = yield call(axios.post, '/api/auth/register', action.data);
    action.history.push('/login');
    yield put({ type: USER_REGISTER_SUCCESS });
  } catch (err) {
    yield put({ type: ERRORS_GET, payload: err.response.data.errors });
  }
}

export function registerRequest(data, history) {
  return { type: USER_REGISTER, data, history };
}
// Watching stuff
export function* registerFlow() {
  yield takeEvery(USER_REGISTER, registerUser);
}

// Login flow

function* loginUser(action) {
  try {
    const res = yield call(axios.post, '/api/users/login', action.data);

    // Save token to localStorage
    const { token } = res.data;
    // Set token to ls
    localStorage.setItem('jwtToken', token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);

    yield put({ type: USER_SET, payload: decoded });
    // redirecting
    action.history.push('/');
  } catch (err) {
    yield put({ type: ERRORS_GET, payload: err.response.data.errors });
  }
}

export function loginRequest(data, history) {
  return { type: USER_LOGIN, data, history };
}

export function* loginFlow() {
  yield takeEvery(USER_LOGIN, loginUser);
}

// Set logged in user
export const setCurrentUser = decoded => ({
  type: USER_SET,
  payload: decoded
});

// Log user out
export const logoutUser = () => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  return {
    type: USER_SET,
    payload: {}
  };
};
