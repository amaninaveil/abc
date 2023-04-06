/**
 * create action & reducer for user
 * thunk for async function
 * data: {
 * isLoggedIn:false}
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OrderApi from "../../api/orderApi";
import UserApi from "../../api/userApi";
import { classifyOrder } from "../../helpers/classifyOrder";

// thunk action to login and get token
export const login = createAsyncThunk("user/login", async (params) => {
  const token = await UserApi.login(params);
  return token;
});

export const adminLogin = createAsyncThunk(
  "user/adminLogin",
  async (params) => {
    const token = await UserApi.adminLogin(params);
    return token;
  }
);

// thunk action to get list order
export const getAllUserOrders = createAsyncThunk(
  "user/getAllUserOrders",
  async () => {
    const orders = await OrderApi.getAllUserOrders();
    const result = classifyOrder(orders);
    return result;
  }
);

export const initialStateUseLoggedIn = () => {
  // let result = cookiesService.getCookies("user");
  let result = localStorage.getItem("user");
  return result === undefined || result === null ? false : true;
};

const user = createSlice({
  name: "user",
  initialState: {
    data: {
      isLoggedIn: initialStateUseLoggedIn(),
      error: "",
      listOrders: null,
    },
  },
  reducers: {
    updateLoggedInStatus: (state, action) => {
      state.data.isLoggedIn = action.payload.isLoggedIn;
    },
    clearData: (state) => {
      state.data.isLoggedIn = false;
      state.data.listOrders = null;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {},
    [login.fulfilled]: (state, action) => {
      state.data.isLoggedIn = true;
      state.data.error = "";
    },
    [login.rejected]: (state) => {
      state.data.error = "Username or password is incorrect";
    },
    [adminLogin.pending]: (state) => {},
    [adminLogin.fulfilled]: (state, action) => {
      state.data.isLoggedIn = true;
      state.data.error = "";
    },
    [adminLogin.rejected]: (state) => {
      state.data.error = "Username or password is incorrect";
    },
    [getAllUserOrders.pending]: (state) => {},
    [getAllUserOrders.fulfilled]: (state, action) => {
      state.data.listOrders = action.payload;
    },
    [getAllUserOrders.rejected]: (state) => {},
  },
});
export default user.reducer;
export const { updateLoggedInStatus, clearData } = user.actions;
