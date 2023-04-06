/**
 * create action & reducer for brand list
 * thunk for async function
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BrandApi from "../../api/brandApi";

// thunk action to get list brand
export const getBrands = createAsyncThunk("brand/getBrands", async () => {
  const listBrand = await BrandApi.getBrands();
  return listBrand.map((brand) => {
    return {
      ...brand,
      isCheckedByAdmin: false,
    };
  });
});

const brand = createSlice({
  name: "brand",
  initialState: {
    data: [],
  },
  reducers: {
    updateBrandFilter: (state, action) => {
      const { id, isCheckedAction } = action.payload;
      const changeItem = state.data.find((item) => item.id === id);
      if (changeItem) {
        changeItem.isCheckedByAdmin = isCheckedAction;
      }
    },
    removeAllBrandFilters: (state) => {
      state.data = state.data.map((brand) => {
        return { ...brand, isCheckedByAdmin: false };
      });
    },
    removeBrand: (state, action) => {
      state.data = state.data.filter((brand) => brand.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getBrands.pending]: (state) => {
    },
    [getBrands.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [getBrands.rejected]: (state) => {
    },
  },
});
export const { updateBrandFilter, removeAllBrandFilters, removeBrand } =
  brand.actions;
export default brand.reducer;
