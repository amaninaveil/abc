import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Spinner } from "reactstrap";
import ProductApi from "../../../api/productApi";
import ReviewApi from "../../../api/reviewApi";
import {
  DEFAULT_REVIEW_PAGE,
  REVIEWS_PER_PAGE,
} from "../../../utilities/Constant";
import {
  addNewBreadcrumb,
  removeLastBreadcrumb,
} from "../../../utilities/slices/breadcrumbSlice";
import SingleProInfo from "./SingleProInfo/singleProInfo";
import SingleProTab from "./SingleProTab/singleProTab";

function ProductDetail(props) {
  const { productId } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [relatedCategoryProducts, setRelatedCategoryProducts] = useState(null);
  const [relatedBrandProducts, setRelatedBrandProducts] = useState(null);
  const [firstReviews, setFirstReviews] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      return await ProductApi.getDetailedProduct(productId);
    };

    let fetchRelatedCategoryProduct = async () => {
      let response = await ProductApi.getRelatedCategoryPro(productId);
      setRelatedCategoryProducts(response);
    };

    let fetchRelatedBrandProduct = async () => {
      let response = await ProductApi.getRelatedBrandPro(productId);
      setRelatedBrandProducts(response);
    };

    let fetchFirstReviews = async () => {
      let response = await ReviewApi.getReviewsByProductIDByPagination(
        productId,
        DEFAULT_REVIEW_PAGE,
        REVIEWS_PER_PAGE
      );
      setFirstReviews(response);
    };
    setLoading(true);
    fetchProduct()
      .then((response) => {
        dispatch(
          addNewBreadcrumb({
            name: response.name,
            slug: "",
          })
        );
        setProduct(response);
        fetchRelatedBrandProduct();
        fetchRelatedCategoryProduct();
        fetchFirstReviews();
        setLoading(false);
      })
      .catch(() => {
        dispatch(
          addNewBreadcrumb({
            name: "No product",
            slug: "",
          })
        );
        setLoading(false);
        setProduct(null);
      });

    return () => {
      dispatch(removeLastBreadcrumb());
    };
  }, [dispatch, productId]);

  const renderProductDetail = () => {
    if (loading) {
      return (
        <Col xs="12" sm="12" md="12" lg="12" className="text-center">
          <Spinner color="primary" />
        </Col>
      );
    }
    if (!product) {
      return <div>No product is avaiable.</div>;
    }
    return (
      <React.Fragment>
        <SingleProInfo product={product} />
        <SingleProTab
          product={product}
          relatedCategoryProducts={relatedCategoryProducts}
          relatedBrandProducts={relatedBrandProducts}
          firstReviews={firstReviews}
        />
      </React.Fragment>
    );
  };

  return <React.Fragment>{renderProductDetail()}</React.Fragment>;
}

//ProductDetail.propTypes = {};

export default ProductDetail;
