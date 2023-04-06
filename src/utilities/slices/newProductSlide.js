import { createSlice } from "@reduxjs/toolkit";

const newProduct = createSlice({
  name: "orderModal",
  initialState: {
    mainInfo: {},
    specs: {},
  },
  reducers: {
    updateMainInfo: (state, action) => {},
    updateSpecs: (state, action) => {},
  },
});
export const { updateMainInfo, updateSpecs } = newProduct.actions;
export default newProduct.reducer;
