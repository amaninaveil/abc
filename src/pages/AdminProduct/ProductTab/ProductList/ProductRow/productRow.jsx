import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import image from "../../../../../assets/images/headphone1.jpeg";
import handlePrice from "../../../../../helpers/formatPrice";
import "./_productRow.scss";

function ProductRow(props) {
  const { product, index, removeItem } = props;
  const location = useLocation();

  return (
    <tr className="product-table-item separated-table-item">
      <td className="number">{index}</td>
      <td className="photo">
        <img src={image} alt="" />
      </td>
      <td className="name">
        <div>
          <b>{product.name}</b>
        </div>
      </td>

      <td className="price text-right">{handlePrice(product.price)}</td>
      <td className="brand">
        <div>{product.brandName}</div>
      </td>
      <td className="text-center sale-program sale">
        {product.saleProgram ? (
          <button
            className="sale-event btn"
            data-toggle="modal"
            data-target="#saleProductModal"

            // onClick={(e) => e.stopPropagation()}
          >
            {product.saleProgram.value}
          </button>
        ) : (
          <button className="no-sale btn" onClick={(e) => e.stopPropagation()}>
            Create Sale
          </button>
        )}
      </td>
      <td className="product-action action">
        <div className="d-flex justify-content-between align-items-center">
          <NavLink
            to={`${location.pathname}?type=1&action=edit&id=${product.id}`}
          >
            <i className="far fa-eye"></i>
          </NavLink>
          <i
            className="fa fa-times"
            data-toggle="modal"
            data-target="#modalRemoveSuppiler"
            onClick={() => removeItem(product.id)}
          ></i>
        </div>
      </td>
    </tr>
  );
}

ProductRow.propTypes = {};

export default ProductRow;
