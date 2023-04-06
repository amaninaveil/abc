import { createSlice } from "@reduxjs/toolkit";

const productTemp = createSlice({
  name: "productTemp",
  initialState: {
    productId: null,
  },
  reducers: {
    updateProductTemp: (state, action) => {
      state.productId = action.payload;
    },
  },
});
export const { updateProductTemp } = productTemp.actions;
export default productTemp.reducer;
