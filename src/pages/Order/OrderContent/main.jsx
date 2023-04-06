import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import ModalCancelOrder from "../../../components/Order/ModalCancelOrder/modalCancelOrder";
import ModalReceived from "../../../components/Order/ModalReceived/modalReceived";
import { getAllUserOrders } from "../../../utilities/slices/userSlice";
import OrderBody from "./OrderBody/orderBody";
import OrderDetail from "./OrderDetail/orderDetail";

function OrderContent(props) {
  const location = useLocation();
  const tabName = useLocation().pathname.replace("/your-orders/", "");
  const urlId = location.search
    ? new URLSearchParams(location.search).get("id")
    : 0;
  const { orderId } = useSelector((state) => state.orderModal);
  const stateOrders = useSelector((state) => state.user.data.listOrders);
  const dispatch = useDispatch();

  // get list orders
  useEffect(() => {
    async function fetchOrders() {
      await dispatch(getAllUserOrders());
    }
    if (!stateOrders) {
      fetchOrders();
    }
  }, [dispatch]);

  // useEffect(() => {
  //   // dispatch(resetOrderModal());
  // }, [dispatch, tabName]);

  return (
    <>
      <Route exact path="/your-orders/:orderStatus">
        {urlId ? (
          <OrderDetail orderId={urlId} />
        ) : (
          stateOrders &&
          stateOrders[tabName].map((order) => (
            <OrderBody key={order.id} order={order} />
          ))
        )}
      </Route>

      <ModalCancelOrder orderId={orderId} />
      <ModalReceived orderId={orderId} />
    </>
  );
}

OrderContent.propTypes = {};

export default OrderContent;
