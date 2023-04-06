import React from "react";
import handlePrice from "../../../helpers/formatPrice";

function MonthRevenueRow(props) {
  const { invoices, number } = props;
  return (
    <tr>
      <td>{number}</td>
      <td>{invoices.date}</td>
      <td>{invoices.totalInvoices}</td>
      <td className="">
        <div className="revenue d-flex justify-content-end text-right">
          {" "}
          {handlePrice(invoices.revenue)}
        </div>
      </td>
    </tr>
  );
}

MonthRevenueRow.propTypes = {};

export default MonthRevenueRow;
