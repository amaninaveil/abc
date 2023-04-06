import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import handlePrice from "../../../helpers/formatPrice";
import { OrderActionName } from "../../../pages/Order/type";
import { updateOrderModal } from "../../../utilities/slices/orderModalSlice";
import { parseOrderTime } from "../../../helpers/parseOrderTime";

function OrderSummary(props) {
  const { order } = props;
  const history = useHistory();
  const currentPath = useLocation().pathname;
  const dispatch = useDispatch();

  const handleRowClick = () => {
    history.push(`${currentPath}?id=${order.id}`, { from: currentPath });
    dispatch(
      updateOrderModal({
        modalType: OrderActionName.VIEW_DETAIL,
        orderId: order.id,
      })
    );
  };

  return (
    <tr className="table-item" onClick={handleRowClick}>
      <td className="">{order.id}</td>
      <td className="">{parseOrderTime(order.lastConfirm)}</td>

      <td className="order-status">{order.statusDetail}</td>
      <td className="">{order.totalItems}</td>
      <td className="">{handlePrice(order.total)}</td>
      <td className="">
        <i className="far fa-eye"></i>
      </td>
    </tr>
  );
}

OrderSummary.propTypes = {};

export default React.memo(OrderSummary);
