import { createSlice } from "@reduxjs/toolkit";

const initialOrderPeriod = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
};

const adminOrder = createSlice({
  name: "adminOrder",
  initialState: {
    orderPeriod: initialOrderPeriod(),
  },
  reducers: {
    updateOrderPeriod: (state, action) => {
      state.orderPeriod = action.payload;
    },
  },
});
export const { updateOrderPeriod } = adminOrder.actions;
export default adminOrder.reducer;
