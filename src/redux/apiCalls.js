import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  updateProfilStart,
  updateProfilSuccess,
  updateProfilFailure,
} from './userRedux';
import { publicRequest, userRequest } from '../utils/api';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
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
    const res = await userRequest.post('/auth/logout', { currentUser: user });
    dispatch(logoutSuccess(res.data));
    console.log('currentUser logged in ?', res.data);
  } catch (err) {
    dispatch(logoutFailure());
    console.log('redux', err);
  }
};

export const updateProfil = async (dispatch, userId, form) => {
  dispatch(updateProfilStart());
  try {
    const res = await userRequest.post(`/users/updateProfil/${userId}`, form);
    dispatch(updateProfilSuccess(res.data));
  } catch (err) {
    dispatch(updateProfilFailure());
  }
};
