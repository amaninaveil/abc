import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import OrderApi from "../../../api/orderApi";
import { OrderActionName } from "../../../pages/Order/type";
import ModalFooter from "../ModalFooter/modalFooter";
import { MESSAGE_ORDER } from "../type";
import { useDispatch } from "react-redux";
import { getAllUserOrders } from "../../../utilities/slices/userSlice";

function ModalReceived(props) {
  const { orderId, modalType } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);

  useEffect(() => {
    if (isSucceed) {
      setIsSucceed(false);
    }
  }, [orderId]);

  const redirectToCompletedOrder = () => {
    const url = history.location.pathname.startsWith("/admin")
      ? `/admin/order/shipped`
      : "/your-orders/deliveried";
    isSucceed && history.push(url);
  };

  const renderCustomerBody = () => {
    if (!isSucceed) {
      return (
        <>
          <div className="text-center pb-2">
            <i className="far fa-check-circle success"></i>
          </div>
          <div>
            <b>Thank you for your purchase. </b>We are grateful if you take a
            few minutes to write your review.
          </div>
          <br />
          <div>
            <small>
              Note:{" "}
              <em>
                If you click OK, you cannot request a refund for this order.
              </em>
            </small>
          </div>
        </>
      );
    } else {
      return (
        <div>
          Your request is recorded by TechShop. If you have any questions,
          contact TechShop now!
        </div>
      );
    }
  };

  const renderAdminBody = () => {
    if (!isSucceed) {
      return (
        <>
          <div className="text-center pb-2">
            <i className="far fa-check-circle success"></i>
          </div>
          <div>Are you sure this package shipped to customer successfuly?</div>
          <br />
          <div>
            <small>
              <em>Waiting for valuable feedback from customer!</em>
            </small>
          </div>
        </>
      );
    } else {
      return (
        <div>
          Your request is recorded by TechShop. Waiting for valuable feedback
          from customer!
        </div>
      );
    }
  };

  const confirmRequest = async () => {
    let response;
    setLoading(true);
    response = await OrderApi.updateOrderStatus(orderId);

    if (response) {
      setLoading(false);
      setIsSucceed(true);
      if (!history.location.pathname.startsWith("/admin")) {
        dispatch(getAllUserOrders());
      }
    }
  };

  return (
    <div
      className="modal fade modal-confirm"
      id="modalReceived"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="menuModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title">
              <b>
                {isSucceed
                  ? MESSAGE_ORDER.SUCCESSFUL_REQUEST
                  : modalType === OrderActionName.SHIPPED_SUCCESSFULLY
                  ? MESSAGE_ORDER.SHIPPED_QUESTION
                  : MESSAGE_ORDER.RECEIVED_QUESTION}
              </b>
            </h6>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={redirectToCompletedOrder}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {modalType === OrderActionName.SHIPPED_SUCCESSFULLY
              ? renderAdminBody()
              : renderCustomerBody()}
          </div>
          <div className="modal-footer">
            <ModalFooter
              isSucceed={isSucceed}
              loading={loading}
              confirmRequest={confirmRequest}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

ModalReceived.propTypes = {};

export default React.memo(ModalReceived);
