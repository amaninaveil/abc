<<<<<<< HEAD
import WishIcon from "components/common/WishIcon/wishIcon";
import parseImages from "helpers/parseImages";
=======
import WishIcon from "../../../../components/common/WishIcon/wishIcon";
import parseImages from "../../../../helpers/parseImages";
>>>>>>> 07fce43b4a0105a4c50e03dec00ea1d4baa2cd06
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import ProductInfo from "../ProductInfo/productInfo";
import "./_singleProInfo.scss";
import noimage from "../../../../assets/images/noimage.png";

SingleProInfo.propTypes = {
  product: PropTypes.object,
};
SingleProInfo.defaultProps = {
  products: {},
};

function SingleProInfo(props) {
  const { product } = props;
  const images = parseImages(product.images);
<<<<<<< HEAD
  //console.log(images)
  const [activeImage, setActiveImage] = useState(images[0]);
=======
  const [activeImage, setActiveImage] = useState(
    images.length > 0 ? images[0] : noimage
  );
>>>>>>> 07fce43b4a0105a4c50e03dec00ea1d4baa2cd06

  const displayImage = (src) => {
    setActiveImage(src);
  };
  const renderImages = (images) => {
    return images.length > 0
      ? images.map((image, index) => (
          <Col
            key={index}
            xs="6"
            sm="6"
            md="3"
            lg="3"
            className="product-slider"
          >
            <div
              className="small-image"
              onClick={() => {
                displayImage(image);
              }}
            >
              <img src={image} alt="apple-watch" className="" />
            </div>
          </Col>
        ))
      : "";
  };
  useEffect(() => {
<<<<<<< HEAD
    setActiveImage(images[0]);
=======
    setActiveImage(images.length > 0 ? images[0] : noimage);
>>>>>>> 07fce43b4a0105a4c50e03dec00ea1d4baa2cd06
  }, [product.images]);
  return (
    <div className="single-pro-info">
      <div className="row">
        <div className="col-lg-5">
          <div className="single-pro-slider">
            <img src={activeImage} alt="apple-watch" />
            <WishIcon id={product.id} />
          </div>
        </div>
        <div className="col-lg-7 product-info">
          <ProductInfo product={product} />

          <Row>{renderImages(images)}</Row>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SingleProInfo);
