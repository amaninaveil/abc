import { createSlice } from "@reduxjs/toolkit";

const filterInitialState = {
  filters: [],
  isSale: false,
};
const filterProduct = createSlice({
  name: "filterProduct",
  initialState: filterInitialState,
  reducers: {
    addFilter: (state, action) => {
      state.filters.unshift(action.payload);
    },
    removeFilter: (state, action) => {
      const { id, name } = action.payload;
      state.filters = state.filters.filter(
        (item) => item.id !== id || item.name !== name
      );
    },
    updateSaleFilter: (state, action) => {
      state.isSale = !state.isSale;
    },
    clearAllFilters: (state, action) => {
      return { ...state, filters: filterInitialState.filters };
    },
  },
});
export const { addFilter, removeFilter, clearAllFilters, updateSaleFilter } =
  filterProduct.actions;
export default filterProduct.reducer;
