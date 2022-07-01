import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isFetching: false,
    error: {},
    currentUser: false,
    userId: '',
    username: '',
    profilPic: '',
    isAdmin: '',
  },
  reducers: {
    // login/logout
    loginStart: (state) => {
      state.isFetching = true;
      state.error = {};
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload.currentUser;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.profilPic = action.payload.profilPic;
      state.isAdmin = action.payload.isAdmin;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      console.log("action.payload",action.payload)
      state.error = action.payload;
    },

    logoutStart: (state) => {
      state.isFetching = true;
    },

    logoutSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.userId = '';
      state.username = '';
      state.profilPic = '';
    },

    logoutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = userSlice.actions;

export default userSlice.reducer;
