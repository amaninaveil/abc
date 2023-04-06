import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import GlobalStyle from "./assets/styles/GlobalStyle";
import SignOut from "./components/AdminHeader/SignOut/signOut";
import AdminNav from "./components/main/AdminNav/adminNav";
import Footer from "./components/main/Footer/footer";
import ScrollToTop from "./components/main/ScrollToTop/scrollToTop";
import ScrollToTopRouter from "./components/main/ScrollToTop/scrollToTopRouter";
import NotFoundPage from "./components/notFoundPage";
import PrivateRoute from "./components/privateRoute";
import AdminCustomer from "./pages/AdminCustomer/main";
import AdminHome from "./pages/AdminHome/main";
import AdminLogin from "./pages/AdminLogin/main";
import AdminOrder from "./pages/AdminOrder/main";
import AdminProduct from "./pages/AdminProduct/main";
import Header from "./pages/Header/header";
import Home from "./pages/Home/main";
import Login from "./pages/Login/login";
import OrderPage from "./pages/Order/main";
import Product from "./pages/Product/main";
import ShoppingCart from "./pages/ShoppingItems/main";
import SupportedSupplier from "./pages/SupportedSupplier/main";
import "./_app.scss";

function App() {
  console.log("app");

  return (
    <div className="wrapper">
      <GlobalStyle />
      <SignOut />
      <div className="main-content">
        <Router>
          <Header />
          <Switch>
            <Route
              path={[
                "/admin/home",
                "/admin/order/:orderStatus",
                "/admin/product",
                "/admin/supplier",
                "/admin/customer",
              ]}
            >
              <div
                className="pt-1 px-0 d-flex"
                style={{ height: "100vh", backgroundColor: "white" }}
              >
                <div style={{ width: "20%" }}>
                  <AdminNav />
                </div>
                <div style={{ width: "80%" }}>
                  <Switch>
                    <Route path="/admin/home">
                      <AdminHome />
                    </Route>
                    <Route path="/admin/order/:orderStatus">
                      <AdminOrder />
                    </Route>
                    <Route path="/admin/product">
                      <AdminProduct />
                    </Route>
                    <Route path="/admin/supplier">
                      <SupportedSupplier />
                    </Route>
                    <Route path="/admin/customer">
                      <AdminCustomer />
                    </Route>
                  </Switch>
                </div>
              </div>
            </Route>

            <Route path="/admin/login">
              <AdminLogin />
            </Route>

            <Route
              path={[
                "/home",
                "/shopping-cart",
                "/wish-list",
                "/product",
                "/product/:productCategory",
                "/login",
                "/check-out",
                "/your-orders/:orderStatus",
                "/your-orders/:orderStatus/:orderId",
              ]}
            >
              <div className="body-content">
                <ScrollToTop />
                <ScrollToTopRouter>
                  <Switch>
                    <Route exact path={["/home", "/"]}>
                      <Home />
                    </Route>
                    <Route path={["/shopping-cart", "/wish-list"]}>
                      <ShoppingCart />
                    </Route>
                    <Route path={["/product", "/product/:productCategory"]}>
                      <Product />
                    </Route>
                    <Route path="/login">
                      <Login />
                    </Route>

                    <PrivateRoute path="/check-out">
                      <ShoppingCart />
                    </PrivateRoute>
                    <PrivateRoute
                      path={[
                        "/your-orders/:orderStatus",
                        "/your-orders/:orderStatus/:orderId",
                      ]}
                    >
                      <OrderPage />
                    </PrivateRoute>
                  </Switch>
                </ScrollToTopRouter>

                <Footer />
              </div>
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
