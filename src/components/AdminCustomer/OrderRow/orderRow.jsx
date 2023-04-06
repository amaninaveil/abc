import React from "react";
import handlePrice from "../../../helpers/formatPrice";
import "./_orderRow.scss";
import { parseOrderTime } from "../../../helpers/parseOrderTime";

function OrderRow(props) {
  const { isCancelled, order, number } = props;
  return (
    <tr className="customer-orders-table-item separated-table-item">
      <td className="number">{number}</td>

      <td className="id">
        <a
          href="#"
          data-toggle="tooltip"
          title={order.id}
          onClick={() => false}
        >
          <div>{order.id}</div>
        </a>
      </td>

      <td className="last-confirm">{parseOrderTime(order.lastConfirm)}</td>
      <td className="item">{order.totalItems}</td>
      <td className="price">
        <div>{handlePrice(order.total)}</div>
      </td>
      {isCancelled ? (
        <>
          <td className="reason">
            <a
              href="#"
              data-toggle="tooltip"
              title={order.reason}
              onClick={() => false}
            >
              <div>{order.reason}</div>
            </a>
          </td>
          <td className="actor">
            <div className="text-capitalize">
              {order.whoCancel.toLowerCase()}
            </div>
          </td>
        </>
      ) : (
        <td className="status">{order.statusDetail}</td>
      )}

      <td className="action text-center">
        <i className="far fa-eye"></i>
      </td>
    </tr>
  );
}

OrderRow.propTypes = {};

export default React.memo(OrderRow);
