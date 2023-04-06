import React from "react";
import PropTypes from "prop-types";
import ProductAction from "../../../../components/ProductComponents/ProductAction/productAction";
import ProductRating from "../../../../components/common/ProductRating/productRating";
import "./_productInfo.scss";
import handlePrice from "../../../../helpers/formatPrice";

ProductInfo.propTypes = {
  product: PropTypes.object,
};
ProductInfo.defaultProps = {
  products: {},
};

const renderTechInfo = (shortTech) => {
  if (shortTech !== undefined) {
    var shortTechInfo = shortTech.replace(/'/g, '"');
    shortTechInfo = JSON.parse(shortTechInfo);
    return shortTechInfo.map((info, index) => <p key={index}>{info}</p>);
  } else return "";
};

function ProductInfo(props) {
  const { product } = props;
  return (
    <div className="product-info">
      <div className="title">
        <div className="product-name">{product.name}</div>
        <div className="product-rating">
          <ProductRating rate={product.rate} />
        </div>
      </div>
      <div className="title">
        <div className="product-price">
          {handlePrice(product.price)} <u>đ</u>
        </div>
        <div className="">
          <i>Brand: </i>
          <span className="product-price">{product.brandName}</span>
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <div className="col-lg-7 short-tech-info">
          {renderTechInfo(product.shortTech)}
        </div>
        <div className="col-lg-5">
          <ProductAction
            stock={product.stock}
            stockStatus={product.stockStatus}
            id={product.id}
            name={product.name}
            price={product.price}
            isDeleted={product?.isDeleted}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductInfo);
