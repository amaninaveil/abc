import React from "react";
import { Route } from "react-router-dom";
import "../../assets/styles/_childBanner.scss";
import Breadcrumb from "../../components/common/Breadcrumb/breadcrumb";
import NavShopping from "../../components/ShoppingItemsComponents/NavShoppingItems/navShopping";
import Cart from "./Cart/cart";
import CheckOut from "./CheckOut/checkOut";
import WishList from "./WishList/wishList";
import "./_shoppingItems.scss";

function ShoppingItems(props) {

  return (
    <div className="wrapper-dashboard shopping-cart-area">
      <div className="child-banner shopping-cart-banner">
        <div className="breadcrumb-nav container">
          <Breadcrumb />
        </div>
      </div>
      <div className="shopping-cart-view">
        <div className="container-fluid">
          <NavShopping />

          <div className="row">
            <Route path="/shopping-cart">
              <Cart />
            </Route>
            <Route path="/wish-list">
              <WishList />
            </Route>
            <Route path="/check-out">
              <CheckOut />
            </Route>
          </div>
        </div>
      </div>
    </div>
  );
}

ShoppingItems.propTypes = {};

export default React.memo(ShoppingItems);
