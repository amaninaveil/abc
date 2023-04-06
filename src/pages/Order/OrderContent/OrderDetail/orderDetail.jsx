import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import OrderApi from "../../../../api/orderApi";
import CustomerInfoModal from "../../../../components/AdminCustomer/CustomerInfoModal/customerInfoModal";
import ModalShipperInfo from "../../../../components/Order/ModalShipperInfo/modalShipperInfo";
import OrderProduct from "../../../../components/Order/Product/orderProduct";
import ReviewModal from "../../../../components/Order/ReviewModal/reviewModal";
import handlePrice from "../../../../helpers/formatPrice";
import { OrderActionName, OrderStatus } from "../../type";
import OrderAction from "../OrderAction/orderAction";
import "./_orderDetail.scss";

function OrderDetail(props) {
  const { modalType } = useSelector((state) => state.orderModal);
  const { orderId } = props;
  const location = useLocation();

  const { orderStatus } = useParams();

  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(false);
  
  const [newShipperInfo, setNewShipperInfo] = useState();

  let progressList = [
    {
      orderStatusLabel: OrderStatus.PLACED_ORDER,
      icon: "fas fa-ellipsis-h",
    },
    {
      orderStatusLabel: OrderStatus.IN_HANDLING,
      icon: "fas fa-check",
    },
    {
      orderStatusLabel: OrderStatus.SHIPPED,
      icon: "fas fa-truck",
    },
    {
      orderStatusLabel: OrderStatus.DELIVERIED,
      icon: "fas fa-home",
    },
  ];

  const parseOrderTime = (time) => {
    let dateTime = new Date(time);
    return `${dateTime.getDate()}/${
      dateTime.getMonth() + 1
    }/${dateTime.getFullYear()} - ${dateTime.getHours()}:${
      dateTime.getMinutes() < 10 ? "0" : ""
    }${dateTime.getMinutes()}`;
  };

  const renderProgress = (orderProgessDetail) => {
    if (order?.cancelled) {
      progressList = [
        {
          orderStatusLabel: OrderStatus.PLACED_ORDER,
          icon: "fas fa-ellipsis-h",
        },
        {
          orderStatusLabel: OrderStatus.CANCELLED,
          icon: "fas fa-times",
        },
      ];
    }
    const progressDetail = progressList.map((progress) => {
      switch (progress.orderStatusLabel) {
        case OrderStatus.PLACED_ORDER:
          progress.orderTime = orderProgessDetail[0];
          progress.active =
            orderProgessDetail[1] || order.cancelledDate
              ? "complete"
              : "active";
          break;
        case OrderStatus.IN_HANDLING:
          progress.orderTime = orderProgessDetail[1] || "";
          progress.active = orderProgessDetail[1]
            ? orderProgessDetail[2]
              ? "complete"
              : "active"
            : "disable";
          break;
        case OrderStatus.SHIPPED:
          progress.orderTime =
            orderProgessDetail[3] || orderProgessDetail[2] || "";
          progress.active = orderProgessDetail[2]
            ? orderProgessDetail[4]
              ? "complete"
              : "active"
            : "disable";
          break;
        case OrderStatus.DELIVERIED:
          progress.orderTime = orderProgessDetail[4] || "";
          progress.active = orderProgessDetail[4] ? "active" : "disable";
          break;
        case OrderStatus.CANCELLED:
          progress.orderTime = order.cancelledDate || "";
          progress.active = "active";
          break;
        default:
          break;
      }
      return progress;
    });
    return progressDetail.map((progress) => (
      <div
        className={`col bs-wizard-step ${progress.active} p-0`}
        key={progress.icon}
      >
        <div className="text-center bs-wizard-stepnum text-dark order-status-label">
          {progress.orderStatusLabel}
        </div>
        <div className="progress">
          <div className="progress-bar"></div>
        </div>
        <div className="bs-wizard-dot d-flex justify-content-center align-items-center">
          <i className={progress.icon}></i>
        </div>
        <div className="bs-wizard-info text-center order-time">
          {progress.orderTime && parseOrderTime(progress.orderTime)}
        </div>
      </div>
    ));
  };

  useEffect(() => {
    const getDetailedOrder = async () => {
      setLoading(true);

      await OrderApi.getOrder(orderId)
        .then((res) => {
          setOrder(res);
        })
        .catch(() => {
          setOrder(null);
        });
      setLoading(false);
    };

    getDetailedOrder();
  }, [orderId, orderStatus]);

  const renderOrderDetail = () => {
    if (loading) {
      return (
        <div className="text-center loading-review">
          <Spinner color="primary" />
        </div>
      );
    }
    if (!order) {
      return <div>No order is avaiable</div>;
    }
    return (
      <div className="order-detail">
        <div className="d-flex justify-content-between py-3 px-4 text-uppercase header">
          <div>
            <NavLink
              to={
                location.pathname.startsWith("/admin")
                  ? `/admin/order/${orderStatus}`
                  : `/your-orders/${orderStatus}`
              }
            >
              <i className="fas fa-chevron-left mr-2"></i>Back
            </NavLink>
          </div>
          <div className="sub-title">
            <span className="pr-3">Order Id: {orderId}</span>
            <span className="pl-3 order-status">{order.status}</span>
          </div>
        </div>
        <div className="order-process px-4 py-5">
          <div className="container-fluid">
            <div className="row bs-wizard">
              {renderProgress(order.processDate)}
            </div>
          </div>
        </div>

        <div className="shipping-address p-4">
          <div className="d-flex justify-content-between">
            <h4>Shipping Address</h4>
            {newShipperInfo || order?.shipper ? (
              <div className="shipper">
                <div>
                  <small>
                    Shipper: {newShipperInfo?.name || order.shipper.name}
                  </small>
                </div>
                <div>
                  <small>
                    Shipper's phone number:{" "}
                    {newShipperInfo?.phone || order.shipper.phone}
                  </small>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="row">
            <div className="col-4 buyer">
              <div className="buyer-name">{order.shippingInfo.fullname}</div>
              <div className="buyer-info">
                <small>
                  <div>{order.shippingInfo.phone}</div>
                  <div>{order.shippingInfo.address}</div>
                </small>
              </div>
            </div>
            <div className="col-8 order-action">
              <OrderAction
                orderId={orderId}
                orderStatus={order.status}
                statusDetail={order.statusDetail}
                isReviewed={order.processDate.length === 6}
                isDetailedOrder={true}
              />
            </div>
          </div>
        </div>

        <div className="list-product px-4 pt-4">
          <h4>Your Order</h4>
          {order.detailedInvoices.map((product) => (
            <OrderProduct key={`${orderId}${product.id}`} product={product} />
          ))}
        </div>

        <div className="total d-flex justify-content-end pr-4 align-items-center">
          <div className="total-order-label pr-3 py-2">Total Order</div>
          <div className="total-order py-2">
            {handlePrice(order.total)} <u>đ</u>
          </div>
        </div>
        {/* {order?.shipperInfo ? (
      <div className="total d-flex justify-content-end pr-4 align-items-center">
        <div className="total-order-label pr-3 py-2">Shipping Fee</div>
        <div className="total-order py-2">
          {handlePrice(order.shipperInfo.fee)} <u>đ</u>
        </div>
      </div>
    ) : (
      ""
    )} */}
        {/* <div className="total d-flex justify-content-end pr-4 align-items-center">
      <div className="total-order-label pr-3 py-2">Coupon</div>
      <div className="total-order py-2">-10.000đ</div>
    </div> */}
        <div className="total d-flex justify-content-end pr-4 align-items-center">
          <div className="total-order-label pr-3 py-2">Total</div>
          <div className="total-order py-2 final-price">
            <b>
              {handlePrice(order.total)} <u>đ</u>
            </b>
          </div>
        </div>
        {order.status === OrderStatus.DELIVERIED ? (
          <ReviewModal order={order} orderId={orderId} />
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <>
      {renderOrderDetail()}
      {modalType === OrderActionName.TRANSFER_TO_SHIPPER ||
      modalType === OrderActionName.EDIT_SHIPPER_INFO ? (
        <ModalShipperInfo
          orderId={orderId}
          modalType={modalType}
          shipper={newShipperInfo || order?.shipper}
          updateShipperInfo={(info) => setNewShipperInfo(info)}
        />
      ) : (
        ""
      )}

      {modalType === OrderActionName.VIEW_CUSTOMER_HISTORY ? (
        <CustomerInfoModal customerID={order.customerID} />
      ) : (
        ""
      )}
    </>
  );
}

OrderDetail.propTypes = {};

export default React.memo(OrderDetail);
