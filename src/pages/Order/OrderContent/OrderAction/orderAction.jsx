import React from "react";
import { useHistory } from "react-router-dom";
import OrderButton from "../../../../components/Order/OrderAction/orderButton";
import { OrderActionName, OrderStatus } from "../../type";

function OrderAction(props) {
  const { orderStatus, isDetailedOrder, orderId, isReviewed, statusDetail } =
    props;
  const history = useHistory();

  const renderCustomerActionButton = () => {
    let orderButtons = [];
    switch (orderStatus) {
      case OrderStatus.PLACED_ORDER:
      case OrderStatus.IN_HANDLING:
        orderButtons = [
          {
            btnName: OrderActionName.CANCEL_ORDER,
            isMainBtn: true,
          },
        ];
        break;
      case OrderStatus.SHIPPED: {
        if (statusDetail === "On the way") {
          orderButtons = [
            {
              btnName: OrderActionName.RETURN_PACKAGE,
              isMainBtn: true,
            },
          ];
        } else {
          orderButtons = [
            {
              btnName: OrderActionName.RECEIVED,
              isMainBtn: true,
            },
            {
              btnName: OrderActionName.RETURN_PACKAGE,
              isMainBtn: false,
            },
          ];
        }
        break;
      }

      case OrderStatus.DELIVERIED:
        if (isDetailedOrder) {
          orderButtons = [
            {
              btnName: isReviewed
                ? OrderActionName.VIEW_RATE
                : OrderActionName.RATE,
              onclickFunc: () => {},
              isMainBtn: true,
            },
          ];
        }
        break;
      default:
        break;
    }
    const isMainButton = orderButtons.length === 0 ? true : false;
    if (!isDetailedOrder) {
      orderButtons.push({
        btnName: OrderActionName.VIEW_DETAIL,
        onclickFunc: () => {},
        isMainBtn: isMainButton,
      });
    }
    return orderButtons.map((button) =>
      isDetailedOrder ? (
        <div className="action-container" key={button.btnName}>
          <OrderButton
            orderId={orderId}
            isMainBtn={button.isMainBtn}
            btnName={button.btnName}
          />
        </div>
      ) : (
        <OrderButton
          orderId={orderId}
          key={button.btnName}
          isMainBtn={button.isMainBtn}
          btnName={button.btnName}
        />
      )
    );
  };

  const renderAdminActionButton = () => {
    let orderButtons = [];
    switch (orderStatus) {
      case OrderStatus.PLACED_ORDER:
        orderButtons = [
          {
            btnName: OrderActionName.CONFIRMED,
            isMainBtn: true,
          },
          {
            btnName: OrderActionName.VIEW_CUSTOMER_HISTORY,
            isMainBtn: true,
          },
          {
            btnName: OrderActionName.ADMIN_CANCEL_ORDER,
            isMainBtn: false,
          },
        ];
        break;
      case OrderStatus.IN_HANDLING:
        orderButtons = [
          {
            btnName: OrderActionName.TRANSFER_TO_SHIPPER,
            isMainBtn: true,
          },
          {
            btnName: OrderActionName.ADMIN_CANCEL_ORDER,
            isMainBtn: false,
          },
        ];
        break;
      case OrderStatus.SHIPPED: {
        if (statusDetail === "On the way") {
          orderButtons = [
            {
              btnName: OrderActionName.EDIT_SHIPPER_INFO,
              isMainBtn: true,
            },
            {
              btnName: OrderActionName.SHIPPED_SUCCESSFULLY,
              isMainBtn: true,
            },
            {
              btnName: OrderActionName.ADMIN_CANCEL_ORDER,
              isMainBtn: false,
            },
          ];
        }
        break;
      }

      case OrderStatus.DELIVERIED:
        orderButtons = isReviewed
          ? [
              {
                btnName: OrderActionName.VIEW_RATE,
                onclickFunc: () => {},
                isMainBtn: true,
              },
            ]
          : [];
        break;
      default:
        break;
    }

    return orderButtons.map((button) => (
      <div className="action-container" key={button.btnName}>
        <OrderButton
          orderId={orderId}
          isMainBtn={button.isMainBtn}
          btnName={button.btnName}
        />
      </div>
    ));
  };

  return (
    <div className="order-action">
      {history.location.pathname.startsWith("/admin")
        ? renderAdminActionButton()
        : renderCustomerActionButton()}
    </div>
  );
}

OrderAction.propTypes = {};

export default OrderAction;
