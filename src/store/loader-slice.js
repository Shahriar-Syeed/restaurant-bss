import { createSlice } from "@reduxjs/toolkit";

const initialLoader = {
  isLoading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState: initialLoader,
  reducers: {
    show(state) {
      state.isLoading = true;
    },
    hide(state) {
      state.isLoading = false;
    },
    
  },
});

export const loaderActions = loaderSlice.actions;

export default loaderSlice.reducer;
