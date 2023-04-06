import { createSlice } from "@reduxjs/toolkit";
import { NotificationType } from "../../components/common/NotificationModal/type";

const notification = createSlice({
  name: "notification",
  initialState: {
    type: null,
    message: null,
  },
  reducers: {
    showSuccessMessage: (state, action) => {
      state.type = NotificationType.SUCCESS_NOTIFICATION;
      if (action.payload && action.payload.message) {
        state.message = action.payload.message;
      } else {
        state.message = "Your action is successful.";
      }
    },
    showFailedMessage: (state, action) => {
      state.type = NotificationType.FAILED_NOTIFICATION;
      if (action.payload && action.payload?.message) {
        state.message = action.payload.message;
      } else {
        state.message = "Your action failed. Please try again after a while.";
      }
    },
    hideMessage: (state) => {
      state.type = null;
      state.message = null;
    },
  },
});
export const { showSuccessMessage, hideMessage, showFailedMessage } =
  notification.actions;
export default notification.reducer;
