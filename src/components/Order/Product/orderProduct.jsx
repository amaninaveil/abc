import React from "react";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import handlePrice from "../../../helpers/formatPrice";
import parseImages from "../../../helpers/parseImages";
import "./_orderProduct.scss";
import noimage from "../../../assets/images/noimage.png";

function OrderProduct(props) {
  const { product } = props;
  const images = parseImages(product.images);
  return (
    <Link
      to={`/product/${product.categorySlug}?id=${product.id}`}
      // onClick={() =>dispatch(updateProductTemp(product.id))}
      className="product-info-container"
    >
      <Media className="py-3 product-info">
        <img
          alt=""
          className="mr-3"
          src={images.length > 0 ? images[0] : noimage}
        />
        <Media.Body className="product-body">
          <h5>{product.name}</h5>

          <div className="d-flex justify-content-between">
            <p>
              <small>x {product.quantity}</small>
            </p>
            <div>
              {product.oldPrice && (
                <span className="old-price mx-2">
                  <small>
                    {handlePrice(product.oldPrice)} <u>đ</u>
                  </small>
                </span>
              )}

              <span className="price">
                <small className="font-weight-bold">
                  {handlePrice(product.salePrice)} <u>đ</u>
                </small>
              </span>
            </div>
          </div>
        </Media.Body>
      </Media>
    </Link>
  );
}

export default OrderProduct;
