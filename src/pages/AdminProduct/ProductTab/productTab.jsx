import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import SaleModal from "../../../components/AdminProduct/SaleModal/saleModal";
import { getAllProducts } from "../../../utilities/slices/productSlice";
import FilterBar from "./FilterBar/filterBar";
import ProductDetail from "./ProductDetail/productDetail";
import ProductList from "./ProductList/productList";
import SearchBar from "./SearchBar/searchBar";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import "./_productTab.scss";

function ProductTab(props) {
  const filterItem = useSelector((state) => state.filterProduct.filters);
  const stateProducts = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState();
  const [renderProducts, setRenderProducts] = useState();

  const location = useLocation();
  const history = useHistory();
  const currentAction = location.search
    ? new URLSearchParams(location.search).get("action")
    : 0;
  const productIdURL = location.search
    ? new URLSearchParams(location.search).get("id")
    : 0;

  useEffect(() => {
    if (stateProducts.allProducts) {
      const result = filterSearchProducts(
        filterItem,
        searchInput,
        stateProducts.allProducts
      );
      setRenderProducts(result);
    }
  }, [filterItem, searchInput, stateProducts]);

  const filterSearchProducts = (filterValue, searchValue, products) => {
    let result;
    if (filterValue.length || searchValue) {
      if (filterValue.length) {
        let category = [];
        let brand = [];
        filterValue.forEach((value) => {
          if (value.itemCategory === "Category") {
            category.push(value.name);
          } else if (value.itemCategory === "Brand") {
            brand.push(value.name);
          }
        });
        if (category.length) {
          result = products.filter((product) =>
            category.includes(product.categoryName)
          );
        }
        if (brand.length) {
          if (category.length) {
            result = result.filter((product) =>
              brand.includes(product.brandName)
            );
          } else {
            result = products.filter((product) =>
              brand.includes(product.brandName)
            );
          }
        }
      }
      if (searchValue) {
        searchValue = searchValue.trim();
        searchValue = searchValue.toLowerCase();
        if (filterValue.length) {
          result = result.filter((product) =>
            product.name.toLowerCase().includes(searchValue)
          );
        } else {
          result = products.filter((product) =>
            product.name.toLowerCase().includes(searchValue)
          );
        }
      }
    } else {
      result = products;
    }
    return result;
  };

  useEffect(() => {
    async function fetchProduct() {
      // setLoading(true);
      await dispatch(getAllProducts());
    }
    if (!stateProducts.allProducts) {
      fetchProduct();
    } else {
      // setLoading(false);
    }
  }, [dispatch, stateProducts]);

  return (
    <div className="product-table separated-table">
      {!currentAction ? (
        <div className="p-3">
          <SearchBar updateSearchInput={(keyword) => setSearchInput(keyword)} />
          <FilterBar />
        </div>
      ) : (
        ""
      )}
      <div className="product-table-header p-3">
        <h2 className="text-center">
          {!productIdURL ? "Products" : "Product Detail"}
          {!currentAction ? (
            <NavLink to={`${location.pathname}?type=1&action=add`}>
              <Button>
                <b>Add new</b>
              </Button>
            </NavLink>
          ) : (
            <Button onClick={() => history.goBack()}>
              <b>Back</b>
            </Button>
          )}
        </h2>
      </div>
      {!currentAction ? (
        <ProductList products={renderProducts} key="productList" />
      ) : (
        <ProductDetail id={productIdURL} key="productDetail" />
      )}
      <SaleModal />
    </div>
  );
}

ProductTab.propTypes = {};

export default ProductTab;
