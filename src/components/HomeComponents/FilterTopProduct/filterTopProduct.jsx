import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../utilities/slices/categorySlice";

function FilterTopProduct(props) {
  const stateCategories = useSelector((state) => state.category.data);
  const dispatch = useDispatch();
  // get categories
  useEffect(() => {
    async function fetchCategories() {
      await dispatch(getCategories());
    }
    if (!stateCategories.length) {
      fetchCategories();
    }
  }, [dispatch, stateCategories]);
  const renderTopProducts = () => {
    let result = [];
    for (let i = 0; i < 4; i++) {
      result.push(
        <button
          key={stateCategories[i].id}
          type="button"
          className={`btn btn-outline-secondary ${i === 0 ? "active" : ""}`}
          name={stateCategories[i].id}
          onClick={changeTypeTopProduct}
        >
          {stateCategories[i].name}
        </button>
      );
    }
    return result;
  };
  const { changeTypeTopProduct } = props;
  return <div>{stateCategories.length && renderTopProducts()}</div>;
}

FilterTopProduct.propTypes = {
  changeTypeTopProduct: PropTypes.func,
};

export default FilterTopProduct;
