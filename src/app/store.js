import { configureStore } from "@reduxjs/toolkit";
import reducerBreadcrumb from "../utilities/slices/breadcrumbSlice";
import reducerCategory from "../utilities/slices/categorySlice";
import reducerBrand from "../utilities/slices/brandSlice";
import reducerFilter from "../utilities/slices/filterSlice";
import reducerProductModal from "../utilities/slices/productModalSlice";
import reducerProduct from "../utilities/slices/productSlice";
import reducerCart from "../utilities/slices/cartSlice";
import reducerWishList from "../utilities/slices/wishListSlice";
import reducerUser from "../utilities/slices/userSlice";
import reducerOrderModal from "../utilities/slices/orderModalSlice";
import reducerFilterProduct from "../utilities/slices/filterProduct";
import reducerNewProduct from "../utilities/slices/newProductSlide";
import reducerAdminOrder from "../utilities/slices/adminOrderSlice";
import reducerProductTemp from "../utilities/slices/productTemp";
import reducerNotification from "../utilities/slices/notificationSlice";
import reducerShipper from "../utilities/slices/shipperSlice";
import reducerCustomer from "../utilities/slices/customerSlice";

const rootReducer = {
  productModal: reducerProductModal,
  category: reducerCategory,
  brand: reducerBrand,
  product: reducerProduct,
  filter: reducerFilter,
  filterProduct: reducerFilterProduct,
  breadcrumb: reducerBreadcrumb,
  cart: reducerCart,
  wishList: reducerWishList,
  user: reducerUser,
  orderModal: reducerOrderModal,
  newProduct: reducerNewProduct,
  adminOrder: reducerAdminOrder,
  productTemp: reducerProductTemp,
  notification: reducerNotification,
  shipper: reducerShipper,
  customer: reducerCustomer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
