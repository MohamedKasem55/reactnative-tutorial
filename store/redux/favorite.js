import {createSlice} from '@reduxjs/toolkit';
import {slices} from './slices';

const favProductsSlice = createSlice({
  name: "favorite",
  initialState: {
    ids: [],
  },
  reducers: {
    add: (state, action) => {
      state.ids.push(action.payload.id);
    },
    remove: (state, action) => {
      state.ids = state.ids.filter((id) => id !== action.payload.id);
    },
  },
});

export const favProductsActions = favProductsSlice.actions;
export default favProductsSlice.reducer;
