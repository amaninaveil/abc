import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "reactstrap";
import ProductApi from "../../../../api/productApi";
import LongDescription from "./LongDescription/longDescription";
import MainInfo from "./MainInfo/mainInfo";
import ProductSpecification from "./Specification/productSpecification";
import { useDispatch } from "react-redux";
import {
  showFailedMessage,
  showSuccessMessage,
} from "../../../../utilities/slices/notificationSlice";
import { useHistory } from "react-router-dom";
import {
  updateProduct,
  addProduct,
} from "../../../../utilities/slices/productSlice";

function ProductDetail(props) {
  const { id } = props;

  const [productDetail, setProductDetail] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      return await ProductApi.getAdminDetailedProduct(id);
    };
    if (id) {
      fetchProductDetail()
        .then((res) => setProductDetail(res))
        .catch(() => setProductDetail(null))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (event) => {
    const formData = new FormData(event.currentTarget);
    let mainInfo = {};
    event.preventDefault();

    const newSpecifications = [];
    const existedAttributes = [];
    const longDescription = [];
    let description = {
      header: "",
      content: "",
    };
    let index = 0;
    for (let [key, value] of formData.entries()) {
      if (key.startsWith("NEW_SPECS_")) {
        const newAttribute = key.replace("NEW_SPECS_", "").split("_");

        const newSpecs = {
          name: newAttribute[0],
          dataType: newAttribute[1],
          value,
        };
        newSpecifications.push(newSpecs);
      } else if (key.startsWith("EXISTED_SPECS_")) {
        const existedSpecsValue = key.replace("EXISTED_SPECS_", "").split("_");

        existedAttributes.push({
          id: existedSpecsValue[0],
          value,
          dataType: existedSpecsValue[1],
        });
      } else if (key === "header" || key === "content") {
        description[key] = value;
        if (index === 1) {
          if (description.header !== "" || description.content !== "") {
            longDescription.push(description);
          }
          description = {
            header: "",
            content: "",
          };
          index = 0;
        } else {
          index++;
        }
      } else {
        mainInfo = { ...mainInfo, [key]: value };
      }
    }
    const body = {
      ...mainInfo,
      newSpecifications,
      existedAttributes,
      longDescription: JSON.stringify(longDescription),
    };

    if (id) {
      const fetchProductDetail = async () => {
        return await ProductApi.getAdminDetailedProduct(id);
      };
      ProductApi.updateProductInfo({ ...body, id })
        .then((res) => {
          dispatch(showSuccessMessage());
          dispatch(updateProduct(res));
          fetchProductDetail().then((res) => {
            setProductDetail(res);
          });
        })
        .catch(() => {
          dispatch(showFailedMessage());
        });
    } else {
      ProductApi.addProduct(body)
        .then((res) => {
          dispatch(showSuccessMessage());
          dispatch(addProduct(res));

          history.push("/admin/product");
        })
        .catch(() => {
          dispatch(showFailedMessage());
        });
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : !id || (id && productDetail) ? (
        <Form onSubmit={handleSubmit} className="px-3 pb-3">
          <MainInfo product={productDetail} />
          <LongDescription product={productDetail} />
          <ProductSpecification product={id ? productDetail : null} />
          <Button type="submit" className="w-100 btn-submit">
            {id ? "Update" : "Add"}
          </Button>
        </Form>
      ) : (
        <div className="text-center">No product is avaiable</div>
      )}
    </>
  );
}

ProductDetail.propTypes = {};

export default ProductDetail;
