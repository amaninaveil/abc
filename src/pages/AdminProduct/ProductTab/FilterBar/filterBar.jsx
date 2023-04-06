import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import FilterItem from "../../../../components/AdminProduct/FilterItem/filterItem";
import FilterSelection from "../../../../components/AdminProduct/FilterSelection/filterSelection";
import {
  getBrands,
  removeAllBrandFilters,
} from "../../../../utilities/slices/brandSlice";
import {
  getCategories,
  removeAllCategoryFilters,
} from "../../../../utilities/slices/categorySlice";
import {
  clearAllFilters,
  updateSaleFilter,
} from "../../../../utilities/slices/filterProduct";
import "./_filterBar.scss";

function FilterBar(props) {
  const stateCategories = useSelector((state) => state.category.data);
  const filterItem = useSelector((state) => state.filterProduct.filters);
  const stateBrands = useSelector((state) => state.brand.data);
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

  // get brands
  useEffect(() => {
    async function fetchBrands() {
      await dispatch(getBrands());
    }

    if (!stateBrands.length) {
      fetchBrands();
    }
  }, [dispatch, stateBrands]);

  const renderFilterItem = () => {
    return filterItem.map((item) => <FilterItem item={item} key={item.name} />);
  };

  const clearAllFilterItems = () => {
    dispatch(clearAllFilters());
    dispatch(removeAllCategoryFilters());
    dispatch(removeAllBrandFilters());
  };

  return (
    <div className="container-fluid my-1">
      <Row>
        <Col
          sm="6"
          xs="5"
          md="5"
          lg="6"
          xl="7"
          className="p-0 d-flex justify-content-between align-items-center"
        >
          {filterItem.length > 0 ? (
            <>
              <div className="filter-bar d-flex mr-2">{renderFilterItem()}</div>
              <span aria-hidden="true" onClick={clearAllFilterItems}>
                &times;
              </span>
            </>
          ) : (
            ""
          )}
        </Col>
        <Col
          sm="6"
          xs="8"
          md="7"
          lg="6"
          xl="5"
          className="d-flex justify-content-between align-items-center py-1"
        >
          <FilterSelection selections={stateCategories} name="Category" />
          <FilterSelection selections={stateBrands} name="Brand" />
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                onChange={() => dispatch(updateSaleFilter())}
              />
              Sale Products
            </Label>
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
}

FilterBar.propTypes = {};

export default React.memo(FilterBar);
