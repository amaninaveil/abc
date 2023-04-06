import React from "react";
import { FormGroup, Input, Label, Col } from "reactstrap";
import { ATTRIBUTE_TYPE } from "../../../pages/AdminProduct/ProductTab/ProductDetail/Specification/type";
import "./_productAttributeInput.scss";

function ProductAttributeInput(props) {
  const {
    attribute,
    removeNewAttribute,
    handleValidation,
    listErrors,
    defaultValue,
  } = props;

  const editable = removeNewAttribute ? true : false;

  const renderInput = () => {
    switch (attribute.dataType) {
      case "VARCHAR":
        return (
          <Input
            type="text"
            name={`${editable ? "NEW_SPECS_" : "EXISTED_SPECS_"}${
              attribute.id
            }${editable ? "" : `_${attribute.dataType}`}`}
            defaultValue={defaultValue || ""}
            onBlur={(e) => handleValidation(e, attribute)}
            invalid={listErrors && listErrors[attribute.id] ? true : false}
            required
          />
        );
      case "BOOL":
        return (
          <Input
            type="select"
            name={`${editable ? "NEW_SPECS_" : "EXISTED_SPECS_"}${
              attribute.id
            }${editable ? "" : `_${attribute.dataType}`}`}
            onBlur={(e) => handleValidation(e, attribute)}
            invalid={listErrors && listErrors[attribute.id] ? true : false}
            defaultValue={defaultValue || ""}
            required
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Input>
        );

      case "TEXT":
        return (
          <Input
            type="textarea"
            name={`${editable ? "NEW_SPECS_" : "EXISTED_SPECS_"}${
              attribute.id
            }${editable ? "" : `_${attribute.dataType}`}`}
            onBlur={(e) => handleValidation(e, attribute)}
            invalid={listErrors && listErrors[attribute.id] ? true : false}
            defaultValue={defaultValue || ""}
            required
          />
        );

      case "INT":
        return (
          <Input
            min="0"
            type="number"
            name={`${editable ? "NEW_SPECS_" : "EXISTED_SPECS_"}${
              attribute.id
            }${editable ? "" : `_${attribute.dataType}`}`}
            onBlur={(e) => handleValidation(e, attribute)}
            invalid={listErrors && listErrors[attribute.id] ? true : false}
            defaultValue={defaultValue || ""}
            required
          />
        );

      case "FLOAT":
        return (
          <Input
            min="0"
            type="number"
            step="0.001"
            name={`${editable ? "NEW_SPECS_" : "EXISTED_SPECS_"}${
              attribute.id
            }${editable ? "" : `_${attribute.dataType}`}`}
            onBlur={(e) => handleValidation(e, attribute)}
            invalid={listErrors && listErrors[attribute.id] ? true : false}
            defaultValue={defaultValue || ""}
            required
          />
        );
      default:
        break;
    }
  };

  return (
    <FormGroup row className="align-items-center attribute mb-4">
      <Label sm={4}>
        <div className="name text-capitalize">{attribute.name}</div>
        <div className="data-type text-capitalize">
          ({ATTRIBUTE_TYPE[attribute.dataType]})
        </div>
      </Label>
      <Col sm={8} className="pl-0">
        {renderInput()}

        {editable ? (
          <i
            className="fas fa-times-circle"
            onClick={() => removeNewAttribute(attribute)}
          ></i>
        ) : (
          ""
        )}
        <div className="text-danger error">
          <small>
            {listErrors?.[`${attribute.name}${attribute.dataType}`]}
          </small>
        </div>
      </Col>
    </FormGroup>
  );
}

ProductAttributeInput.propTypes = {};

export default ProductAttributeInput;
