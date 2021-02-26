import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import userApi from '@api/userApi';
// Slice
// const initialUser = localStorage.getItem('user')
//   ? JSON.parse(localStorage.getItem('user'))
//   : null;

// export const login = createAsyncThunk('user/login', async (data) => {
//   const response = await userApi.login(data);
//   return response;
// });

export const logout = createAsyncThunk('user/logout', async (data) => {
  // const response = await userApi.login(data);
  // return response;
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
  window.location.reload();
  return;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isLogin: false,
    // loginLoading: false,
  },
  reducers: {
    checkLogin: (state, action) => {
      const { isLogin, user } = action.payload;
      state.isLogin = isLogin;
      state.user = user;
    },
  },
  // extraReducers: {
  //   [login.pending]: (state) => {
  //     state.loginLoading = true;
  //   },
  //   [login.fulfilled]: (state, action) => {
  //     state.loginLoading = false;
  //     state.user = action.payload.user;
  //     state.isLogin = action.payload.isLogin;
  //   },
  //   [login.rejected]: (state) => {
  //     state.loginLoading = false;
  //   },
  //   [logout.fulfilled]: (state, action) => {
  //     state.isLogin = false;
  //   },
  // },
});

export const { checkLogin } = userSlice.actions;
const { reducer: userReducer } = userSlice;
export default userReducer;
