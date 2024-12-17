import { createSlice } from "@reduxjs/toolkit";

const initialLogin = {
  formData: {
    userName: "admin@mail.com",
    password: "Admin@123",
  },
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLogin,
  reducers: {
    setFormData(state, action) {
      state.formData = action.payload;
    },
    loading(state, action) {
      state.loading = action.payload;
    },
    errorMessage(state, action) {
      state.error = action.payload;
    },
  },
});
export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
