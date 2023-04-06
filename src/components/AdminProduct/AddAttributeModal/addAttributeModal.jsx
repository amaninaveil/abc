import React, { useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { ATTRIBUTE_TYPE } from "../../../pages/AdminProduct/ProductTab/ProductDetail/Specification/type";

function AddAttributeModal(props) {
  const { addNewAttribute, existedAttributes, newAttributes } = props;
  const [newAttr, setNewAttr] = useState();
  const [isVisibleAlert, setIsVisibleAlert] = useState(false);

  const handleInput = (name, value) => {
    if (isVisibleAlert) {
      setIsVisibleAlert(false);
    }

    setNewAttr({
      ...newAttr,
      [name]: value,
    });
  };

  const checkExisted = (e) => {
    if (newAttr?.name && newAttr?.dataType) {
      const existedAttr = existedAttributes.find(
        (attr) =>
          attr.name.toLowerCase() === newAttr.name.toLowerCase() &&
          attr.dataType === newAttr.dataType
      );

      if (existedAttr) {
        setIsVisibleAlert(true);
        return;
      }
      const newExistedAttr = newAttributes.find(
        (attr) =>
          attr.name === newAttr.name && attr.dataType === newAttr.dataType
      );
      if (newExistedAttr) {
        setIsVisibleAlert(true);
        return;
      }
      setIsVisibleAlert(false);
    }
  };

  const checkAndUpdateNewAttribute = () => {
    addNewAttribute({ ...newAttr, id: newAttr.name + "_" + newAttr.dataType });
    resetForm();
  };

  const resetForm = () => {
    setNewAttr({});
  };

  return (
    <div
      className="modal fade"
      id="addAttributeModal"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-md modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Attribute</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={resetForm}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div id="create-course-form">
              <FormGroup>
                <Label>Name</Label>

                <Input
                  type="text"
                  onChange={(e) => handleInput("name", e.target.value)}
                  value={newAttr?.name || ""}
                  onBlur={checkExisted}
                />
              </FormGroup>
              <FormGroup>
                <Label>Data Type</Label>
                <Input
                  type="select"
                  onChange={(e) => handleInput("dataType", e.target.value)}
                  value={newAttr?.dataType || "DEFAULT"}
                  onBlur={checkExisted}
                >
                  <option disabled value="DEFAULT">
                    -- Select an option --
                  </option>
                  {Object.keys(ATTRIBUTE_TYPE).map((key, index) => (
                    <option key={index} value={key}>
                      {ATTRIBUTE_TYPE[key]}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>

            {isVisibleAlert ? (
              <div className="text-danger">
                <small>
                  <i>*This attribute with its data type was added before.</i>
                </small>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success btn-sm"
              data-dismiss="modal"
              onClick={checkAndUpdateNewAttribute}
              disabled={
                !newAttr || !newAttr.name || !newAttr.dataType || isVisibleAlert
              }
            >
              OK
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              data-dismiss="modal"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

AddAttributeModal.propTypes = {};

export default React.memo(AddAttributeModal);
