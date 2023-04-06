/**
 * create action & reducer for product list
 * thunk for async function
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductApi from "../../api/productApi";

const filterProducts = (products) => {
  let filterResults = {};
  products.forEach((product) => {
    const category = product.categorySlug;
    const brand = product.brandName;

    if (!filterResults[category]) {
      filterResults[category] = [];
    }
    filterResults[category].push(product);

    if (!filterResults[brand]) {
      filterResults[brand] = [];
    }
    filterResults[brand].push(product);
  });
  return filterResults;
};

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (params) => {
    const listProduct = await ProductApi.getAllProducts(params);
    const filterProductsResult = filterProducts(listProduct);
    return {
      allProducts: listProduct,
      filterProducts: filterProductsResult,
    };
  }
);

const product = createSlice({
  name: "product",
  initialState: {
    products: {},
  },
  reducers: {
    removeProduct: (state, action) => {
      const id = action.payload.id;
      const deletedProduct = state.products.allProducts.find(
        (product) => product.id === id
      );
      const categorySlug = deletedProduct.categorySlug;
      const brandName = deletedProduct.brandName;

      state.products.allProducts = state.products.allProducts.filter(
        (product) => product.id !== deletedProduct.id
      );
      state.products.filterProducts[categorySlug] =
        state.products.filterProducts[categorySlug].filter(
          (product) => product.id !== id
        );
      state.products.filterProducts[brandName] = state.products.filterProducts[
        brandName
      ].filter((product) => product.id !== id);
    },
    updateProduct: (state, action) => {
      const updatedProduct = state.products.allProducts.find(
        (product) => product.id === action.payload.id
      );

      let categoryfilterProduct = state.products.filterProducts[
        updatedProduct.categorySlug
      ].find((product) => product.id === action.payload.id);
      let brandfilterProduct = state.products.filterProducts[
        updatedProduct.brandName
      ].find((product) => product.id === action.payload.id);

      if (updatedProduct) {
        Object.keys(updatedProduct).map((key) => {
          return (updatedProduct[key] = action.payload[key]);
        });
        Object.assign(categoryfilterProduct, updatedProduct);
        Object.assign(brandfilterProduct, updatedProduct);
      }
    },
    addProduct: (state, action) => {
      const newProduct = action.payload;
      state.products.allProducts.push(newProduct);
      state.products.filterProducts[newProduct.brandName].push(newProduct);
      state.products.filterProducts[newProduct.categorySlug].push(newProduct);
    },
  },
  extraReducers: {
    [getAllProducts.pending]: (state) => {},
    [getAllProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [getAllProducts.rejected]: (state) => {},
  },
});
export const { removeProduct, updateProduct, addProduct } = product.actions;
export default product.reducer;
