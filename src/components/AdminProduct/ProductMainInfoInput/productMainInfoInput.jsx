import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

function ProductMainInfoInput(props) {
  const {
    label,
    handleValidation,
    listErrors,
    dataType,
    name,
    defaultValue,
    disabled,
  } = props;

  return (
    <FormGroup>
      <Label className="text-capitalize">{label}</Label>
      <Input
        type={dataType}
        name={name}
        defaultValue={defaultValue || ""}
        onBlur={handleValidation}
        invalid={listErrors && listErrors[name] ? true : false}
        required={handleValidation ? true : false}
        disabled={disabled}
      />
      <span className="text-danger">
        <small>{listErrors?.[name]}</small>
      </span>
    </FormGroup>
  );
}

ProductMainInfoInput.propTypes = {};

export default ProductMainInfoInput;
