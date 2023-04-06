import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, FormGroup, Spinner } from "reactstrap";
import ProductApi from "../../../../../api/productApi";
import ProductSelection from "../../../../../components/AdminProduct/ProductSelection/productSelection";
import SpecificationInputGroup from "../../../../../components/AdminProduct/SpecificationInputGroup/specificationInputGroup";
import "./_productSpecification.scss";
import { getCategories } from "../../../../../utilities/slices/categorySlice";
import { getBrands } from "../../../../../utilities/slices/brandSlice";

function ProductSpecification(props) {
  const { product } = props;

  const stateCategories = useSelector((state) => state.category.data);
  const stateBrands = useSelector((state) => state.brand.data);

  const [filterSpecification, setFilterSpecification] = useState({});
  const [specsAttributes, setSpecsAttributes] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAttributes = async () => {
      let response = await ProductApi.getProductSpecificationAttribute(
        filterSpecification
      );
      if (response) {
        setLoading(false);
        setSpecsAttributes(response);
      }
    };
    if (
      filterSpecification &&
      filterSpecification.category &&
      filterSpecification.brand
    ) {
      setLoading(true);
      fetchAttributes();
    }
  }, [filterSpecification]);

  const handleSelection = (e) => {
    setFilterSpecification({
      ...filterSpecification,
      [e.target.name]: e.target.value,
    });
  };

  const renderSpecsArea = () => {
    // update specs
    if (product) {
      return (
        <SpecificationInputGroup specsAttributes={product.specifications} />
      );
    } else {
      // add specs for new product
      if (loading) {
        return (
          <div className="text-center">
            <Spinner color="primary" />
          </div>
        );
      }
      if (specsAttributes) {
        return <SpecificationInputGroup specsAttributes={specsAttributes} />;
      }
    }
  };

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

  return (
    <div className="product-specification my-2">
      <div className="text-center header">Specification</div>
      {product ? (
        ""
      ) : (
        <p className="text-center">
          <small>
            *Please choose category and brand of new product before adding
            specification attributes
          </small>
        </p>
      )}

      <FormGroup row>
        <ProductSelection
          name="category"
          options={stateCategories.filter((item) => item.name !== "All")}
          handleSelection={handleSelection}
          defaultValue={product?.categoryName}
        />
        <Col sm={1}></Col>
        <ProductSelection
          name="brand"
          options={stateBrands}
          defaultValue={product?.brandName}
          handleSelection={handleSelection}
        />
      </FormGroup>
      {renderSpecsArea()}
    </div>
  );
}

ProductSpecification.propTypes = {};

export default ProductSpecification;
