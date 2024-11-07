import { createSlice } from "@reduxjs/toolkit";

const initialEmployeeSelect = {
  isOpen: false,
  isFocused:false,
  selectedOption: [],

};

const employeeSelectSlice = createSlice({
  name: "employeeSelect",
  initialState: initialEmployeeSelect,
  reducers: {
    setIsOpen(state,action) {
      state.isOpen = action.payload;
    },    
    setIsFocused(state, action){
      state.isFocused = action.payload;
    },
    setSelectedOption(state, action){
      state.selectedOption = action.payload;
    }
  },
});

export const employeeSelectActions = employeeSelectSlice.actions;

export default employeeSelectSlice.reducer;
