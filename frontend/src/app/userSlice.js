import { createSlice } from '@reduxjs/toolkit';
import axiosClient from '../api/axiosClient';

// Slice
const initialUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

const { reducer: userReducer } = userSlice;
export default userReducer;

// Actions
const { loginSuccess, logoutSuccess } = userSlice.actions;
export const login = ({ username, password }) => async (dispatch) => {
  try {
    const res = await axiosClient.post('/api/auth/login/', {
      username,
      password,
    });
    dispatch(loginSuccess({ username }));
  } catch (e) {
    return console.error(e.message);
  }
};
export const logout = () => async (dispatch) => {
  try {
    const res = await axiosClient.post('/api/auth/logout/');
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
