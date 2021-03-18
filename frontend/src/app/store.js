import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import homeReducer from '@features/home/homeSlice'
export default configureStore({
  reducer: {
    userReducer,
    homeReducer
  },
});
