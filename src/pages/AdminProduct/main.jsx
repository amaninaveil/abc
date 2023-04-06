import React from "react";
import { useLocation } from "react-router-dom";
import { SeparatedTab } from "../common/SeparatedTab/separatedTab";
import ProductTab from "./ProductTab/productTab";
import SpecificationsTab from "./SpecificationsTab/specificationsTab";
import { PRODUCT_TAB_INDEX } from "./type";

function AdminProduct(props) {
  const location = useLocation();
  const typeProductTabIndex = parseInt(
    location.search ? new URLSearchParams(location.search).get("type") : 1
  );

  return (
    <div className="body-content">
      <div className="separated-tab">
        <div className="header d-flex">
          <SeparatedTab tabName="Product" activeTab={typeProductTabIndex} />
        </div>
        <div style={{ backgroundColor: "white" }}>
          {typeProductTabIndex === PRODUCT_TAB_INDEX ? (
            <ProductTab />
          ) : (
            <SpecificationsTab />
          )}
        </div>
      </div>
    </div>
  );
}

AdminProduct.propTypes = {};

export default AdminProduct;
