import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { uiActions } from './uiSlice';

export const startLoginGoogle = createAsyncThunk(
  'users/startLoginGoogle',
  async () => {
    try {
      const { user } = await firebase
        .auth()
        .signInWithPopup(googleAuthProvider);
      return {
        uid: user.uid,
        name: user.displayName,
      };
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.message, 'error');
    }
  }
);
export const registerWithEmailAndPassword = createAsyncThunk(
  'users/registerWithEmailAndPassword',
  async ({ email, password, name }) => {
    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      user.updateProfile({ displayName: name });
      return {
        uid: user.uid,
        name: name,
      };
    } catch (error) {
      console.log(error);
      Swal.fire('Error', error.message, 'error');
    }
  }
);
export const loginWithEmailAndPassword = createAsyncThunk(
  'users/loginWithEmailAndPassword',
  async ({ email, password }, { dispatch }) => {
    try {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      dispatch(uiActions.finishLoading());
      return {
        uid: user.uid,
        name: user.displayName,
      };
    } catch (error) {
      dispatch(uiActions.finishLoading());
      console.log(error);
      Swal.fire('Error', error.message, 'error');
    }
  }
);
export const startLogout = createAsyncThunk('users/logout', async () => {
  try {
    await firebase.auth().signOut();
    return {
      uid: '',
      name: '',
    };
  } catch (error) {
    console.log(error);
    Swal.fire('Error', error.message, 'error');
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', uid: '' },
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return { name: '', uid: '' };
    },
  },
  extraReducers: {
    [startLoginGoogle.fulfilled](state, action) {
      return action.payload;
    },
    [registerWithEmailAndPassword.fulfilled](state, action) {
      return action.payload;
    },
    [loginWithEmailAndPassword.fulfilled](state, action) {
      return action.payload;
    },
    [startLogout.fulfilled](state, action) {
      return action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const { login } = userSlice.actions;
