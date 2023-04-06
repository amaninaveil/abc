import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, FormGroup } from "reactstrap";
import ProductApi from "../../../api/productApi";
import ProductSelection from "../../../components/AdminProduct/ProductSelection/productSelection";
import SpecsRow from "./SpecsRow/specsRow";
import "./_specificationsTab.scss";
import { getCategories } from "../../../utilities/slices/categorySlice";
import { getBrands } from "../../../utilities/slices/brandSlice";
import DeleteAttrModal from "../../../components/AdminProduct/DeleteAttributeModal/deleteAttrModal";

function SpecificationsTab(props) {
  const [modalData, setModalData] = useState();
  const [filterSpecification, setFilterSpecification] = useState({});
  const [specsAttributes, setSpecsAttributes] = useState(null);
  const [loading, setLoading] = useState(false);

  const stateCategories = useSelector((state) => state.category.data);
  const stateBrands = useSelector((state) => state.brand.data);

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

  const handleSelection = (e) => {
    setFilterSpecification({
      ...filterSpecification,
      [e.target.name]: e.target.value,
    });
  };

  const updateSpecsStatus = (updatedSpecs) => {
    const resultArr = [...specsAttributes];
    const result = resultArr.find((specs) => specs.id === updatedSpecs.id);
    result.isDisabled = updatedSpecs.isDisabled;
    setSpecsAttributes(resultArr);
  };

  const removeSpecs = (id) => {
    let resultArr = [...specsAttributes];
    resultArr = resultArr.filter((specs) => specs.id !== id);
    setSpecsAttributes(resultArr);
  };

  return (
    <div className="separated-table specifications-table">
      <div className="header p-3 text-center">
        <div className="product-table-header">
          <h2>Product Specification</h2>
        </div>
        <p>
          <small>*Please choose category and brand</small>
        </p>
        <FormGroup row className="justify-content-center">
          <ProductSelection
            name="category"
            options={stateCategories.filter((item) => item.name !== "All")}
            handleSelection={handleSelection}
          />
          <Col sm={1}></Col>
          <ProductSelection
            name="brand"
            options={stateBrands}
            handleSelection={handleSelection}
          />
        </FormGroup>
      </div>

      <div>
        {specsAttributes && specsAttributes.length !== 0 ? (
          <table className="w-100">
            <thead>
              <tr className="p-3">
                <th className="number text-center">No.</th>
                <th className="name text-center">Name</th>
                <th className="type text-center">Data type</th>
                <th className="status text-center">Status</th>
                <th className="text-center action">Action</th>
              </tr>
            </thead>
            <tbody>
              {specsAttributes.map((specification, index) => (
                <SpecsRow
                  specification={specification}
                  index={index + 1}
                  key={specification.id}
                  updateSpecsStatus={(updatedSpecs) =>
                    updateSpecsStatus(updatedSpecs)
                  }
                  removeItem={(data) => setModalData(data)}
                />
              ))}
            </tbody>
          </table>
        ) : filterSpecification &&
          filterSpecification.category &&
          filterSpecification.brand ? (
          <div className="text-center">No attribute is available</div>
        ) : (
          ""
        )}
      </div>

      {modalData && (
        <DeleteAttrModal
          id={modalData.id}
          removeAction={(id) => removeSpecs(id)}
        />
      )}
    </div>
  );
}

SpecificationsTab.propTypes = {};

export default SpecificationsTab;
