import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CancelModal from "../../components/AdminBrandCategory/CancelModal/cancelModal";
import SupplierModal from "../../components/AdminBrandCategory/SupplierModal/supplierModal";
import { getBrands } from "../../utilities/slices/brandSlice";
import { getCategories } from "../../utilities/slices/categorySlice";
import { SeparatedTab } from "../common/SeparatedTab/separatedTab";
import SupportedTable from "./SupportedTable/supportedTable";
import { BRAND_TAB_INDEX, CATEGORY_TAB_INDEX } from "./type";
import "./_adminBrand.scss";

function SupportedSupplier(props) {
  const [modalData, setModalData] = useState();
  const stateCategories = useSelector((state) => state.category.data);
  const stateBrands = useSelector((state) => state.brand.data);

  const dispatch = useDispatch();

  const location = useLocation();
  const typeSupplier = location.search
    ? new URLSearchParams(location.search).get("type")
    : 1;

  // get categories
  useEffect(() => {
    async function fetchCategories() {
      await dispatch(getCategories());
    }
    if (!stateCategories.length) {
      fetchCategories();
    }
  }, [dispatch, stateCategories]);

  // get brands
  useEffect(() => {
    async function fetchBrands() {
      await dispatch(getBrands());
    }
    if (!stateBrands.length) {
      fetchBrands();
    }
  }, [dispatch, stateBrands]);

  const renderActiveTab = () => {
    switch (parseInt(typeSupplier)) {
      case CATEGORY_TAB_INDEX:
        return (
          <SupportedTable
            listItems={stateCategories}
            name="Categories"
            updateItemModal={(data) => setModalData(data)}
          />
        );
      case BRAND_TAB_INDEX:
        return (
          <SupportedTable
            listItems={stateBrands}
            name="Brands"
            updateItemModal={(data) => setModalData(data)}
          />
        );
      default:
        return (
          <SupportedTable
            listItems={stateCategories}
            name="Categories"
            updateItemModal={(data) => setModalData(data)}
          />
        );
    }
  };

  return (
    <div className="body-content">
      <div className="separated-tab">
        <div className="header d-flex">
          <SeparatedTab tabName="Supplier" activeTab={parseInt(typeSupplier)} />
        </div>

        <div style={{ backgroundColor: "white" }}>{renderActiveTab()}</div>
      </div>
      {modalData && (
        <>
          <SupplierModal
            item={modalData.item}
            type={modalData.name}
            updateModalData={(data) => setModalData(data)}
            listItems={
              modalData.name === "Categories" ? stateCategories : stateBrands
            }
          />
          <CancelModal id={modalData.item?.id} name={modalData.name} />
        </>
      )}
    </div>
  );
}

SupportedSupplier.propTypes = {};

export default SupportedSupplier;
