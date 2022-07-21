import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isFetching: false,
    error: {},
    currentUser: false,
    userId: '',
    username: '',
    img: '',
    publicId:'',
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
      state.img = action.payload.img;
      state.isAdmin = action.payload.isAdmin;
      state.publicId = action.payload.publicId;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      console.log('action.payload', action.payload);
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
      state.img = '';
      state.publicId = '';

    },

    logoutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
     // update profil
     updateProfilStart: (state) => {
      state.isFetching = true;
    },
    updateProfilSuccess: (state, action) => {
      state.isFetching = false;
      state.img = action.payload.img;
      state.username = action.payload.username;
    },
    updateProfilFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  updateProfilStart,
  updateProfilSuccess,
  updateProfilFailure,
} = userSlice.actions;

export default userSlice.reducer;
