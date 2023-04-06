import React, { useEffect, useState } from "react";
import ProductApi from "../../../api/productApi";
import { useDispatch } from "react-redux";
import {
  showSuccessMessage,
  showFailedMessage,
} from "../../../utilities/slices/notificationSlice";

function DeleteAttrModal(props) {
  const { id, removeAction } = props;

  const [affectedProducts, setAffectedProducts] = useState();

  const dispatch = useDispatch();

  const removeItem = () => {
    ProductApi.removeAttribute(id)
      .then((res) => {
        dispatch(showSuccessMessage());
        removeAction(id);
      })
      .catch(() => dispatch(showFailedMessage()));
  };

  useEffect(() => {
    ProductApi.getAffectProduct(id).then((res) => {
      setAffectedProducts(res);
    });
  }, [id]);

  return (
    <div
      className="modal fade modal-cancel"
      id="modalRemoveAttribute"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="menuModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-sm"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title">
              <b>Remove Product Specification Attribute</b>
            </h6>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body d-flex">
            This action will be affect to {affectedProducts} product(s) Are you
            sure you want to delete this item?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={removeItem}
              data-dismiss="modal"
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

DeleteAttrModal.propTypes = {};

export default DeleteAttrModal;
