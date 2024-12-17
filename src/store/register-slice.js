import { createSlice } from "@reduxjs/toolkit";

const initialRegister = {
  registerData: {},
  selectedUserImage: undefined,
  preview: undefined,
  status: null,
  loading: false,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState: initialRegister,
  reducers: {
    getRegisterData(state, action) {
      state.employeeDataTable = action.payload;
    },
    showPreview(state, action) {
      state.preview = action.payload;
    },
    setSelectedUserImage(state, action) {
      state.selectedUserImage = action.payload;
    },
    loading(state, action) {
      state.loading = action.payload;
    },
    errorMessage(state, action) {
      state.error = action.payload;
    },
  },
});
export const registerActions = registerSlice.actions;
export default registerSlice.reducer;
