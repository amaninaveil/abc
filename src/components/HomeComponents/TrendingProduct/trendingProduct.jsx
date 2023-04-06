import handlePrice from "../../../helpers/formatPrice";
import parseImages from "../../../helpers/parseImages";
import PropTypes from "prop-types";
import React from "react";
import "./_trendingProduct.scss";
import noimage from "../../../assets/images/noimage.png";

function TrendingProduct(props) {
  const { product } = props;
  const images = parseImages(product.images);
  return (
    <div className="trending-product d-flex">
      <img src={images.length > 0 ? images[0] : noimage} alt={product.name} />
      <div className="ml-3">
        <div className="name">{product.name}</div>
        <div className="price">
          {handlePrice(product.price)} <u>đ</u>
        </div>
      </div>
    </div>
  );
}

TrendingProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default React.memo(TrendingProduct);
