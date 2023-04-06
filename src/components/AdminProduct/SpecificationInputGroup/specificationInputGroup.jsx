import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import AddAttributeModal from "../AddAttributeModal/addAttributeModal";
import ProductAttributeInput from "../ProductAttributeInput/productAttributeInput";

function SpecificationInputGroup(props) {
  const { specsAttributes } = props;

  const [newAttributes, setNewAttributes] = useState([]);
  const [listErrors, setListErrors] = useState();

  useEffect(() => {
    setNewAttributes([]);
  }, [specsAttributes]);

  const removeNewAttribute = (attr) => {
    const newList = newAttributes.filter(
      (newAttr) =>
        attr.name !== newAttr.name || attr.dataType !== newAttr.dataType
    );
    setNewAttributes(newList);
  };

  const handleValidation = (e, attribute) => {
    const value = e.target.value;
    const newErrors = {};
    const errorName = attribute.name + attribute.dataType;
    switch (attribute.dataType) {
      case "VARCHAR":
      case "TEXT":
        if (!value) {
          newErrors[errorName] = "Cannot be empty.";
        } else {
          newErrors[errorName] = "";
        }
        break;
      case "INT":
        // only include digit
        if (!/^\d+$/.test(value) || parseInt(value) < 0 || !value) {
          newErrors[errorName] = "Natural numbers only.";
        } else {
          newErrors[errorName] = "";
        }
        break;
      case "FLOAT":
        if (
          !/^\d*(\.\d{0,2})?$/.test(value) ||
          parseFloat(value) < 0 ||
          !value
        ) {
          newErrors[errorName] = "Positive number with 2 decimal place only.";
        } else {
          newErrors[errorName] = "";
        }
        break;
      case "BOOL":
        if (!value) {
          newErrors[errorName] = "Cannot be empty";
        } else {
          newErrors[errorName] = "";
        }
        break;
      default:
        break;
    }
    setListErrors({ ...listErrors, ...newErrors });
  };

  const renderExistedAttributes = () => {
    return specsAttributes && specsAttributes.length ? (
      specsAttributes
        .filter((attribute) => !attribute.isDisabled)
        .map((attribute) => (
          <ProductAttributeInput
            attribute={attribute}
            key={attribute.id}
            handleValidation={handleValidation}
            listErrors={listErrors}
            defaultValue={attribute?.value}
          />
        ))
    ) : (
      <div className="text-center">
        <small>
          <b>Product has not any default attributes.</b>
        </small>
      </div>
    );
  };
  return (
    <>
      <div className="container-fluid">
        <Row>
          <Col xs={12} sm={5} className="pl-0 py-2">
            <h5 className="text-center">Existed Attributes</h5>
            {renderExistedAttributes()}
          </Col>
          <Col sm={1}></Col>
          <Col xs={12} sm={6} className="new-attribute py-2">
            <h5 className="text-center">New Attributes</h5>

            {newAttributes.map((attr) => (
              <ProductAttributeInput
                attribute={attr}
                key={attr.name + attr.dataType}
                removeNewAttribute={removeNewAttribute}
                handleValidation={handleValidation}
                listErrors={listErrors}
              />
            ))}

            <div className="text-right">
              <button
                data-backdrop="static"
                data-keyboard="false"
                type="button"
                className="btn btn-add-specs"
                data-toggle="modal"
                data-target="#addAttributeModal"
              >
                Add New
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <AddAttributeModal
        addNewAttribute={(attr) => setNewAttributes([...newAttributes, attr])}
        existedAttributes={specsAttributes}
        newAttributes={newAttributes}
      />
    </>
  );
}

SpecificationInputGroup.propTypes = {};

export default SpecificationInputGroup;
