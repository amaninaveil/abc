import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { Col, Row, Spinner } from "reactstrap";
import ProductModal from "../../../../components/common/ProductModal/productModal";
import ProductPagination from "../../../../components/ProductComponents/ProductPagination/productPagination";
import ProductCard from "../../../../pages/Product/common/ProductCard/productCard";
import { PRODUCTS_PER_PAGE } from "../../../../utilities/Constant";
import { updateBreadcrumb } from "../../../../utilities/slices/breadcrumbSlice";
import { getAllProducts } from "../../../../utilities/slices/productSlice";
import "./_productList.scss";

function ProductList() {
  const stateProducts = useSelector((state) => state.product.products);
  const stateProductModal = useSelector((state) => state.productModal);

  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);

  const productCategory = useParams().productCategory;
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPage = location.search
    ? new URLSearchParams(location.search).get("page")
    : 0;
   

  useEffect(() => {
    dispatch(
      updateBreadcrumb({
        name: "product",
        slug: `${location.pathname}${
          currentPage === 0 ? "" : `?page=${currentPage}`
        }`,
      })
    );
  }, [productCategory, currentPage]);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      await dispatch(getAllProducts());
    }
    if (!stateProducts.allProducts) {
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [dispatch, stateProducts]);

  useEffect(() => {
    if (!stateProducts.allProducts) {
      return;
    }
    let result = [];
    let baseProducts;

    if (productCategory === "all") {
      baseProducts = stateProducts.allProducts;
    } else {
      baseProducts = stateProducts.filterProducts[productCategory];
    }

    const startProductIndx = currentPage * PRODUCTS_PER_PAGE;
    const endProductIndx = startProductIndx + PRODUCTS_PER_PAGE;
    for (
      let i = startProductIndx;
      i < baseProducts?.length && i < endProductIndx;
      i++
    ) {
      result.push(baseProducts[i]);
    }

    setProducts(result);
  }, [currentPage, stateProducts, productCategory]);

  const renderProductCards = (products) => {
    if (loading) {
      return (
        <Col xs="12" sm="12" md="12" lg="12" className="text-center">
          <Spinner color="primary" />
        </Col>
      );
    } else
      return products.length !== 0
        ? products.map((product, index) => (
            <Col key={index} xs="12" sm="6" md="4" lg="4">
              <ProductCard product={product} />
            </Col>
          ))
        : "";
  };

  const renderHeading = () => {
    let totalProducts;
    if (productCategory === "all") {
      totalProducts = stateProducts.allProducts.length;
    } else if (stateProducts.filterProducts[productCategory]) {
      totalProducts = stateProducts.filterProducts[productCategory].length;
    } else {
      return <div className="text-center">No products is avaiable</div>;
    }

    const startIndex = currentPage * PRODUCTS_PER_PAGE;
    const endIndex =
      startIndex + PRODUCTS_PER_PAGE > totalProducts
        ? totalProducts
        : startIndex + PRODUCTS_PER_PAGE;
    return (
      <>
        <div></div>
        <div className="showing">
          Showing {startIndex + 1}-{endIndex} of {totalProducts} results
        </div>
      </>
    );
  };

  const renderPagination = () => {
    let totalProducts;
    if (productCategory === 'all') {
      totalProducts = stateProducts.allProducts.length;
    } else if (stateProducts.filterProducts[productCategory]) {
      totalProducts = stateProducts.filterProducts[productCategory].length;
    } else {
      return;
    }
    return (
      <ProductPagination
        totalProducts={totalProducts}
        currentPage={parseInt(currentPage)}
      />
    );
  };

  return (
    <React.Fragment>
      {products && <div className="product-heading">{renderHeading()}</div>}
      <Row>{products && renderProductCards(products)}</Row>
      {stateProducts.allProducts && renderPagination()}

      <ProductModal product={stateProductModal.data} />
    </React.Fragment>
  );
}

export default ProductList;
