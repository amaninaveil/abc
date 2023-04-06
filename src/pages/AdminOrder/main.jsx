import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router";
import { useLocation } from "react-router-dom";
import ModalCancelOrder from "../../components/Order/ModalCancelOrder/modalCancelOrder";
import ModalConfirmOrder from "../../components/Order/ModalConfirmOrder/modalConfirmOrder";
import ModalReceived from "../../components/Order/ModalReceived/modalReceived";
import OrderDetail from "../Order/OrderContent/OrderDetail/orderDetail";
import TodoList from "./TodoList/todoList";

function AdminOrder(props) {
  const { orderId, modalType } = useSelector((state) => state.orderModal);
  const location = useLocation();
  const urlId = location.search
    ? new URLSearchParams(location.search).get("id")
    : 0;

  return (
    <div className="body-content">
      <Route exact path="/admin/order/:orderStatus">
        {urlId ? <OrderDetail orderId={urlId} /> : <TodoList />}
      </Route>
      <ModalConfirmOrder orderId={orderId} />
      <ModalCancelOrder orderId={orderId} />
      <ModalReceived orderId={orderId} modalType={modalType} />

      {/* <ModalShipperInfo orderId={orderId} modalType={modalType}/> */}
    </div>
  );
}

AdminOrder.propTypes = {};

export default AdminOrder;
