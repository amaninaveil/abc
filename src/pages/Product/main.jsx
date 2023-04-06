import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import "../../assets/styles/_childBanner.scss";
import Breadcrumb from "../../components/common/Breadcrumb/breadcrumb";
import {
  addNewBreadcrumb,
  removeLastBreadcrumb,
} from "../../utilities/slices/breadcrumbSlice";
import ProductDetail from "./ProductDetail/productDetail";
import ProductGridView from "./ProductGridView/productGridView";
import "./_product.scss";

function Product() {
  const dispatch = useDispatch();
  // const productTempId = useSelector((state) => state.productTemp.productId);
  const location = useLocation();

  useEffect(() => {
    dispatch(
      addNewBreadcrumb({
        name: "product",
        slug: location.pathname,
      })
    );
    return () => {
      dispatch(removeLastBreadcrumb());
    };
  }, [dispatch, location.pathname]);

  const urlId = location.search
    ? new URLSearchParams(location.search).get("id")
    : 0;

  return (
    <div className="wrapper-dashboard product-area">
      <div className="child-banner product-banner">
        <div className="breadcrumb-nav container">
          <Breadcrumb />
        </div>
      </div>
      <div className="product-grid-view">
        <div className="container-fluid">
          <div className="row">
            <Route path={["/product/:productCategory"]}>
              {urlId ? (
                <ProductDetail productId={urlId} />
              ) : (
                <ProductGridView />
              )}
            </Route>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
