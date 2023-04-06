import React from "react";
import PropTypes from "prop-types";
import "./_productModal.scss";
import parseImages from "../../../helpers/parseImages";
import handlePrice from "../../../helpers/formatPrice";
import noimage from "../../../assets/images/noimage.png";

function ProductModal(props) {
  const { product } = props;
  const images = parseImages(product.images);
  return (
    <div
      className="modal fade"
      id="productModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="menuModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div className="modal-content large-content-modal">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" id="modalMenu">
            <div className="product-modal-photo">
              <img
                src={images.length > 0 ? images[0] : noimage}
                alt="apple watch"
              />
            </div>
            <div className="product-modal-info">
              <div className="title info-deco">{product.name}</div>
              <div className="price info-deco">
                {" "}
                {handlePrice(product.price)} <u>đ</u>
              </div>
              <div className="more-info info-deco">
                <a className="all-info " href="/">
                  See more information
                </a>
                <div className="quick-add-to-cart">
                  <input
                    type="number"
                    className="form-control"
                    name=""
                    defaultValue={1}
                    placeholder=""
                  />
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
              <div className="short-desc info-deco">{product.shortDescrip}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductModal.propTypes = {
  product: PropTypes.object,
};
ProductModal.defaultProps = {
  product: {},
};

export default ProductModal;
