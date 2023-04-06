import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import image1 from "../../../../../assets/images/headphone1.jpeg";
import ProductImage from "../../../../../components/AdminProduct/ProductImage/productImage";
import ProductMainInfoInput from "../../../../../components/AdminProduct/ProductMainInfoInput/productMainInfoInput";
import "./_mainInfo.scss";

function MainInfo(props) {
  const { product } = props;

  const [images, setImages] = useState([]);
  const [listErrors, setListErrors] = useState();

  const addImage = () => {
    setImages([...images, image1]);
  };

  const removeImage = () => {
    const newImages = [...images];
    newImages.splice(newImages.length - 1, 1);
    setImages(newImages);
  };

  const renderImages = () => {
    let result = [];
    images.forEach(
      (image, index) =>
        index !== 0 &&
        result.push(
          <div className="small-image" key={image + index}>
            <ProductImage image={image} removeImage={removeImage} />
          </div>
        )
    );
    if (result.length < 3) {
      result.push(
        <div className="small-image add-item" key="add-item" onClick={addImage}>
          <i className="far fa-images content"></i>
        </div>
      );
    }
    return result;
  };

  const handleValidation = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newErrors = {};
    switch (name) {
      case "name":
        if (!value) {
          newErrors[name] = "Cannot be empty.";
        } else {
          newErrors[name] = "";
        }
        break;
      case "price":
      case "stock":
      case "warranty":
        // only include digit
        if (!/^\d+$/.test(value)) {
          newErrors[name] = "Natural numbers only.";
        } else {
          newErrors[name] = "";
        }
        break;
      default:
        break;
    }

    setListErrors({ ...listErrors, ...newErrors });
  };

  return (
    <div className="container-fluid main-info">
      <Row>
        <Col xs={6} sm={5} className="p-0">
          <div className="image-upload d-flex">
            {images.length === 0 ? (
              <div className="large-image mr-3 add-item" onClick={addImage}>
                <div className="content">
                  <i className="far fa-images"></i>
                  <div>+ Choose Product Photo</div>
                </div>
              </div>
            ) : (
              <div className="large-image mr-3">
                <ProductImage image={images[0]} removeImage={removeImage} />
              </div>
            )}
            <div className="small-images d-flex justify-content-between flex-column">
              {images.length === 0 ? "" : renderImages()}
            </div>
          </div>
        </Col>
        <Col xs={6} sm={7} className="pr-0">
          <ProductMainInfoInput
            label="name"
            isRequired={true}
            handleValidation={handleValidation}
            listErrors={listErrors}
            dataType="text"
            name="name"
            defaultValue={product?.name}
            disabled={product ? true : false}
          />
          <Row>
            <Col xs={12} sm={4}>
              <ProductMainInfoInput
                label="price"
                isRequired={true}
                handleValidation={handleValidation}
                listErrors={listErrors}
                dataType="number"
                name="price"
                defaultValue={product?.price}
              />
            </Col>
            <Col xs={12} sm={4}>
              <ProductMainInfoInput
                label="stock"
                isRequired={true}
                handleValidation={handleValidation}
                listErrors={listErrors}
                dataType="number"
                name="stock"
                defaultValue={product?.stock}
              />
            </Col>
            <Col xs={12} sm={4}>
              <ProductMainInfoInput
                label="warranty"
                isRequired={true}
                handleValidation={handleValidation}
                listErrors={listErrors}
                dataType="number"
                name="warranty"
                defaultValue={product?.warranty}
              />
            </Col>
          </Row>
          <ProductMainInfoInput
            label="Short Description"
            isRequired={false}
            listErrors={listErrors}
            dataType="textarea"
            name="shortDescription"
            defaultValue={product?.shortDescrip}
          />
        </Col>
      </Row>
      <div>Long Description</div>
    </div>
  );
}

MainInfo.propTypes = {};

export default MainInfo;
