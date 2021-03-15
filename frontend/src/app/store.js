import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import accReducer from '@cmsviews/UsersManagement/UserRegisterSteps/createAccountSlice';
export default configureStore({
  reducer: {
    userReducer,
    accReducer,
  },
});
