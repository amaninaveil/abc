import React from "react";
import { useDispatch } from "react-redux";
import {
  updateBrandFilter
} from "../../../utilities/slices/brandSlice";
import {
  updateCategoryFilter
} from "../../../utilities/slices/categorySlice";
import {
  removeFilter
} from "../../../utilities/slices/filterProduct";
import "./_filterItem.scss";

function FilterItem(props) {
  const { item } = props;
  const dispatch = useDispatch();

  const updateFilterItems = () => {
    if (item.itemCategory === "Category") {
      dispatch(
        updateCategoryFilter({
          id: item.id,
          isCheckedAction: false,
        })
      );
    } else {
      dispatch(
        updateBrandFilter({
          id: item.id,
          isCheckedAction: false,
        })
      );
    }
    dispatch(removeFilter(item));
  };
  return (
    <div className="filter-item d-flex px-2 mr-1">
      <div className="filter-name mr-2">{item.name}</div>
      <span
        aria-hidden="true"
        onClick={updateFilterItems}
        className="btn-remove-filter-item"
      >
        &times;
      </span>
    </div>
  );
}

FilterItem.propTypes = {};

export default React.memo(FilterItem);
