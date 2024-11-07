import { createSlice } from "@reduxjs/toolkit";

const initialModal = {
  open: false,
  tableId:null,
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
    setTableId(state, action){
      state.tableId = action.payload;
      
    }
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
