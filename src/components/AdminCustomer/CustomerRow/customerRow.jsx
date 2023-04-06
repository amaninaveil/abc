import React from "react";
import image from "../../../assets/images/headphone1.jpeg";
import "./_customerRow.scss";

function CustomerRow(props) {
  const { updateCustomerId, customer, number } = props;
  return (
    <tr className="customer-table-item separated-table-item">
      <td className="number">{number}</td>

      <td className="name">
        <div className="container p-0">
          <img src={image} alt="" />
          <a
            href="#"
            data-toggle="tooltip"
            title={customer.fullname}
            onClick={() => false}
          >
            <div className="ml-2 content-container">{customer.fullname}</div>
          </a>
        </div>
      </td>

      <td className="email">
        <a
          href="#"
          data-toggle="tooltip"
          title={customer.email}
          onClick={() => false}
        >
          <div className="content-container">{customer.email}</div>
        </a>
      </td>
      <td className="phone">
        <div>{customer.phone}</div>
      </td>
      <td className="reward">
        <div>{customer.reward}</div>
      </td>

      <td className="action text-center">
        <i
          className="far fa-eye"
          data-toggle="modal"
          data-target="#modalCustomerInfo"
          onClick={() => updateCustomerId(customer.id)}
        ></i>
      </td>
    </tr>
  );
}

CustomerRow.propTypes = {};

export default CustomerRow;
