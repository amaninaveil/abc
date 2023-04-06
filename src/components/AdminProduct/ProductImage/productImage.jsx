import React from "react";
import "./_productImage.scss";

function ProductImage(props) {
  const { image, removeImage } = props;
  return (
    <div className="new-product-image">
      <i className="far fa-times-circle" onClick={removeImage}></i>
      <img src={image} alt="" />
    </div>
  );
}

ProductImage.propTypes = {};

export default ProductImage;
