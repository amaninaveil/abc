import React from "react";
import "./_todoTable.scss";
import OrderSummary from "../../../../components/AdminOrder/OrderSummary/orderSummary";

function TodoTable(props) {
  const { orders } = props;
  return (
    <div className="mt-4 to-do-order">
      <table className="w-100">
        <thead>
          <tr>
            <th className="">Order Id</th>
            <th className="">Last Confirmed</th>
            <th className="">Status Detail</th>
            <th className="">Total items</th>
            <th className="">Total</th>
            <th className="">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              return <OrderSummary key={order.id} order={order} />;
            })}
        </tbody>
      </table>
    </div>
  );
}

TodoTable.propTypes = {};

export default React.memo(TodoTable);
