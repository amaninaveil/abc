import React from "react";
import { useSelector } from "react-redux";
import SeparatedTabHeader from "../../../components/common/SeparatedTabHeader/separatedTabHeader";
import {
  ATTRIBUTES_TAB_INDEX,
  PRODUCT_TAB_INDEX,
} from "../../AdminProduct/type";
import {
  BRAND_TAB_INDEX,
  CATEGORY_TAB_INDEX,
} from "../../SupportedSupplier/type";
import "./_separatedTab.scss";

function SeparatedTabComponent(props) {
  const { activeTab, tabName } = props;

  const stateCategories = useSelector((state) => state.category.data);
  const stateBrands = useSelector((state) => state.brand.data);

  const renderApproriateTab = () => {
    let headerList;
    switch (tabName) {
      case "Product":
        headerList = [
          {
            name: "All Products",
            index: PRODUCT_TAB_INDEX,
          },
          {
            name: "Specifications",
            index: ATTRIBUTES_TAB_INDEX,
          },
        ];
        break;
      case "Supplier":
        headerList = [
          {
            name: "All Categories",
            index: CATEGORY_TAB_INDEX,
            dataLength: stateCategories.length,
          },
          {
            name: "All Brands",
            index: BRAND_TAB_INDEX,
            dataLength: stateBrands.length,
          },
        ];
        break;
      default:
        headerList = [];
        break;
    }
    return headerList.map((header) => (
      <SeparatedTabHeader
        key={header.index}
        active={activeTab === header.index}
        prevActive={activeTab - 1 === header.index}
        header={header}
        icon="fas fa-th"
      />
    ));
  };
  return <div className="header d-flex">{renderApproriateTab()}</div>;
}

function areSameActiveTab(prevProps, nextProps) {
  if (
    prevProps.activeTab === nextProps.activeTab &&
    prevProps.tabName === nextProps.tabName
  ) {
    return true;
  }
  return false;
}

export const SeparatedTab = React.memo(SeparatedTabComponent, areSameActiveTab);
