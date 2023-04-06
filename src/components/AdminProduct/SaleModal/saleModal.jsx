import React from "react";
import image from "../../../assets/images/headphone1.jpeg";
import Media from "react-bootstrap/Media";
import handlePrice from "../../../helpers/formatPrice";
import "./_saleModal.scss"

function SaleModal(props) {
  return (
    <div
      className="modal fade sale-modal"
      id="saleProductModal"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
      aria-labelledby="saleProductModalLabel"
    >
      <div
        className="modal-dialog modal-md modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Product Promotion</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div>
              <Media className="product-info">
                <img alt="" className="mr-3" src={image} />
                <Media.Body className="product-body">
                  <h5>Apple watch series 4 42mm</h5>
                  <div className="d-flex justify-content-between">
                    <div className="sub-info">
                      <small>Brand: Samsung</small>
                    </div>
                    <div>
                      <span className="price">
                        <small className="font-weight-bold">
                          {handlePrice(4000000)} <u>đ</u>
                        </small>
                      </span>
                    </div>
                  </div>
                </Media.Body>
              </Media>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger btn-sm">
              Sign out
            </button>
            <button
              type="button"
              className="btn btn-success btn-sm"
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

SaleModal.propTypes = {};

export default SaleModal;
