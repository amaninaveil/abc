/**
 * create action & reducer for category list
 * thunk for async function
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoryApi from "../../api/categoryApi";

// thunk action to get list category
export const getCategories = createAsyncThunk(
  "category/getCategories",
  async () => {
    const listCategory = await CategoryApi.getAll();
    return listCategory.map((category) => {
      return {
        ...category,
        isCheckedByAdmin: false,
      };
    });
  }
);

const category = createSlice({
  name: "category",
  initialState: {
    data: [],
  },
  reducers: {
    updateCategoryFilter: (state, action) => {
      const { id, isCheckedAction } = action.payload;
      const changeItem = state.data.find((item) => item.id === id);
      if (changeItem) {
        changeItem.isCheckedByAdmin = isCheckedAction;
      }
    },
    removeAllCategoryFilters: (state) => {
      state.data = state.data.map((category) => {
        return { ...category, isCheckedByAdmin: false };
      });
    },
    removeCategory: (state, action) => {
      state.data = state.data.filter(
        (category) => category.id !== action.payload.id
      );
    },
  },
  extraReducers: {
    [getCategories.pending]: (state) => {
    },
    [getCategories.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [getCategories.rejected]: (state) => {
    },
  },
});
export const {
  updateCategoryFilter,
  removeAllCategoryFilters,
  removeCategory,
} = category.actions;
export default category.reducer;
