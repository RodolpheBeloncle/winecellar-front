import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} from './userRedux';
import { publicRequest, userRequest } from '../utils/api';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('auth/login', user);
    dispatch(loginSuccess(res.data));
    console.log('created session');
  } catch (err) {
    console.log('err', err.response.data);
    dispatch(loginFailure(err.response.data));
  }
};

export const logout = async (dispatch, user) => {
  dispatch(logoutStart());
  try {
    const res = await publicRequest.post('/auth/logout', { currentUser: user });
    dispatch(logoutSuccess(res.data));
    console.log('currentUser logged in ?', res.data);
  } catch (err) {
    dispatch(logoutFailure());
    console.log('redux', err);
  }
};
