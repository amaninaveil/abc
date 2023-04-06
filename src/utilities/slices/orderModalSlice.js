import { createSlice } from "@reduxjs/toolkit";

const orderModal = createSlice({
  name: "orderModal",
  initialState: {
    modalType: "",
    orderId: "",
    shipperInfo: "",
  },
  reducers: {
    updateOrderModal: (state, action) => {
      state.orderId = action.payload.orderId;
      state.modalType = action.payload.btnName;
    },
    resetOrderModal: (state) => {
      state.orderId = "";
      state.modalType = "";
    },
  },
});
export const { updateOrderModal, resetOrderModal } = orderModal.actions;
export default orderModal.reducer;
