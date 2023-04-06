import BtnAdd from "../../../components/common/Button/btnAdd";
import BtnMore from "../../../components/common/Button/btnMore";
import handlePrice from "../../../helpers/formatPrice";
import parseImages from "../../../helpers/parseImages";
import PropTypes from "prop-types";
import React from "react";
import "./_topProduct.scss";
import noimage from "../../../assets/images/noimage.png";

function TopProduct(props) {
  const { product } = props;
  let productData = {
    id: product.id,
    name: product.name,
    price: product.price,
  };
  const images = parseImages(product.images);
  return (
    <div className="d-flex justify-content-center top-product">
      <div className="product-info">
        <img src={images.length > 0 ? images[0] : noimage} alt={product.name} />
        <div className="button">
          <BtnMore />
          <BtnAdd product={productData} />
        </div>
      </div>
      <div className="mt-2 product-name">
        <div className="name">{product.name}</div>
        <div className="price">
          {handlePrice(product.price)} <u>đ</u>
        </div>
      </div>
    </div>
  );
}

TopProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default TopProduct;
