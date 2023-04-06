import { createSlice } from "@reduxjs/toolkit";

const breadcrumb = createSlice({
  name: "breadcrumb",
  initialState: {
    breadcrumb: [
      {
        name: "home",
        slug: "/home",
      },
    ],
  },
  reducers: {
    addNewBreadcrumb: (state, action) => {
      state.breadcrumb.push(action.payload);
    },
    removeLastBreadcrumb: (state, action) => {
      state.breadcrumb.pop();
    },
    updateBreadcrumb: (state, action) => {
      const { name, slug } = action.payload;
      const prevBreadcrumb = state.breadcrumb.find((item) => item.name === name);
      if (prevBreadcrumb) {
        prevBreadcrumb.slug = slug;
      }
    },
  },
});
export const { addNewBreadcrumb, removeLastBreadcrumb, updateBreadcrumb } =
  breadcrumb.actions;
export default breadcrumb.reducer;
