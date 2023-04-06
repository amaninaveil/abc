import Home from "../pages/Home/main";
import Product from "../pages/Product/main";
import ShoppingCart from "../pages/ShoppingItems/main";
import Login from "../pages/Login/login";
import OrderPage from "../pages/Order/main";

export const routes = [
  {
    path: ["/home", "/"],
    exact: true,
    isPrivate: false,
    main: Home,
    key: 1,
  },
  {
    path: ["/shopping-cart", "/wish-list"],
    isPrivate: false,
    exact: false,
    key: 2,
    main: ShoppingCart,
  },
  {
    path: ["/products", "/products/:slug"],
    isPrivate: false,
    exact: false,
    key: 3,
    main: Product,
  },
  {
    path: ["/login"],
    isPrivate: false,
    exact: false,
    key: 4,
    main: Login,
  },
  {
    path: ["/check-out"],
    exact: false,
    key: 5,
    main: ShoppingCart ,
    isPrivate: true,
  },
  {
    path: ["/your-orders/:orderStatus", "/your-orders/:orderStatus/:orderId"],
    exact: false,
    key: 6,
    main: OrderPage,
    isPrivate: true,
  },
];
