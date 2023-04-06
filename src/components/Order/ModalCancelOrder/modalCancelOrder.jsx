import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";
import OrderApi from "../../../api/orderApi";
import ModalFooter from "../ModalFooter/modalFooter";
import { MESSAGE_ORDER, REASON_CANCEL_ORDER } from "../type";
import "./_modalCancelOrder.scss";
import { useDispatch } from "react-redux";
import { getAllUserOrders } from "../../../utilities/slices/userSlice";

function ModalCancelOrder(props) {
  const { orderId } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const [reasonCancelling, setReasonCancelling] = useState();

  useEffect(() => {
    if (isSucceed) {
      setReasonCancelling(null);
      setIsSucceed(false);
    }
  }, [orderId]);

  const confirmRequest = async () => {
    setLoading(true);
    let response = await OrderApi.cancelOrder(orderId, reasonCancelling);
    if (response) {
      setLoading(false);
      setIsSucceed(true);
      if (!history.location.pathname.startsWith("/admin")) {
        dispatch(getAllUserOrders());
      }
    }
  };

  const redirectToCancelledOrder = () => {
    const url = history.location.pathname.startsWith("/admin")
      ? "/admin/order/cancelled"
      : "/your-orders/cancelled";
    isSucceed && history.push(url);
  };

  const updateReasonCancelOrder = (reasonName, reasonContent) => {
    setReasonCancelling({
      reasonName,
      reasonContent,
    });
  };

  return (
    <div
      className="modal fade modal-confirm"
      id="modalCancel"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="menuModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title">
              <b>
                {isSucceed
                  ? MESSAGE_ORDER.SUCCESSFUL_REQUEST
                  : MESSAGE_ORDER.CANCEL_ORDER}
              </b>
            </h6>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={redirectToCancelledOrder}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {isSucceed ? (
              <div>
                Your request is recorded by TechShop. If you have any questions,
                contact TechShop now!
              </div>
            ) : (
              <>
                <h4 className="apology mt-2 mb-3">
                  We apologise for any inconvenience caused!
                </h4>
                <h5 className="complain">What made you cancel?</h5>
                {REASON_CANCEL_ORDER.map((reason) => {
                  return (
                    <React.Fragment key={reason.name}>
                      <FormGroup
                        check
                        className="py-2"
                        onChange={() => {
                          updateReasonCancelOrder(reason.name, reason.reason);
                        }}
                      >
                        <Label check>
                          <Input type="radio" name="reasonCancel" />
                          {reason.reason ? (
                            reason.reason
                          ) : reasonCancelling?.reasonName === reason.name ? (
                            <>
                              Other<span className="text-danger">(*)</span>
                            </>
                          ) : (
                            "Other"
                          )}
                        </Label>
                      </FormGroup>
                      {reason.name === "OTHER_REASON" &&
                      reasonCancelling?.reasonName === "OTHER_REASON" ? (
                        <Input
                          type="textarea"
                          className="ml-2"
                          placeholder="Your Valuable Feedback"
                          onChange={(e) => {
                            updateReasonCancelOrder(
                              reason.name,
                              e.target.value
                            );
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  );
                })}
              </>
            )}
          </div>
          <div className="modal-footer">
            <ModalFooter
              isSucceed={isSucceed}
              loading={loading}
              confirmRequest={confirmRequest}
              isDisabled={!reasonCancelling?.reasonContent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

ModalCancelOrder.propTypes = {};

export default React.memo(ModalCancelOrder);
