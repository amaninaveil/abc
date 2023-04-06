import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { OrderActionName } from "../../../pages/Order/type";
import { updateOrderModal } from "../../../utilities/slices/orderModalSlice";
import "./_orderButton.scss";

function OrderButton(props) {
  const { isMainBtn, btnName, orderId } = props;

  const dispatch = useDispatch();
  const currentPath = useLocation().pathname;

  const updateModalInfo = () => {
    dispatch(updateOrderModal({ btnName, orderId }));
  };

  const dataTargetButton = () => {
    switch (btnName) {
      case OrderActionName.CANCEL_ORDER:
      case OrderActionName.RETURN_PACKAGE:
      case OrderActionName.ADMIN_CANCEL_ORDER:
        return "#modalCancel";
      case OrderActionName.RECEIVED:
      case OrderActionName.SHIPPED_SUCCESSFULLY:
        return "#modalReceived";
      case OrderActionName.RATE:
      case OrderActionName.VIEW_RATE:
        return "#reviewModal";
      case OrderActionName.TRANSFER_TO_SHIPPER:
      case OrderActionName.EDIT_SHIPPER_INFO:
        return "#modalShipperInfo";

      case OrderActionName.CONFIRMED:
        return "#modalConfirm";
      case OrderActionName.VIEW_CUSTOMER_HISTORY:
        return "#modalCustomerInfo";
      default:
        break;
    }
  };

  return (
    <button
      data-backdrop="static"
      data-keyboard="false"
      data-toggle="modal"
      data-target={`${dataTargetButton()}`}
      className={`${isMainBtn ? "main-btn" : ""} btn`}
      onClick={updateModalInfo}
    >
      {btnName === OrderActionName.VIEW_DETAIL ? (
        <NavLink to={`${currentPath}?id=${orderId}`}>{btnName}</NavLink>
      ) : (
        <>{btnName}</>
      )}
    </button>
  );
}

export default OrderButton;
