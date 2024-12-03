import { createSlice } from "@reduxjs/toolkit";

const initialModal = {
  open: false,
  id:null,
  data:null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModal,
  reducers: {
    open(state) {
      state.open = true;
    },
    close(state) {
      state.open = false;
    },
    id(state, action){
      state.id = action.payload;      
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
