import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryApi from '@api/categoryApi';

export const getListCategory = createAsyncThunk(
  'home/getListCategory',
  async () => {
    const res = await categoryApi.getListCategory();
    return res?.data;
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    category: [],
  },
  reducers: {},
  extraReducers: {
    [getListCategory.fulfilled]: (state, action) => {
      state.category = action.payload;
    },
  },
});

const { reducer: homeReducer } = homeSlice;
export default homeReducer;
