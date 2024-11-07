import { createSlice } from "@reduxjs/toolkit";

const initialCustomSelect = {
  isOpen: false,
  isFocused:false,
  selectedOption: null,

};

const customSelectSlice = createSlice({
  name: "customSelect",
  initialState: initialCustomSelect,
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

export const customSelectActions = customSelectSlice.actions;

export default customSelectSlice.reducer;
