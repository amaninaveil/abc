import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, Input, Label } from "reactstrap";
import OrderApi from "../../../api/orderApi";
import { OrderActionName } from "../../../pages/Order/type";
import ModalFooter from "../ModalFooter/modalFooter";
import { MESSAGE_ORDER } from "../type";
import { useSelector, useDispatch } from "react-redux";
import { getShippers } from "../../../utilities/slices/shipperSlice";
import {
  showFailedMessage,
  showSuccessMessage,
} from "../../../utilities/slices/notificationSlice";

function ModalShipperInfo(props) {
  const { orderId, modalType, shipper, updateShipperInfo } = props;
  const PREV_SHIPPER_INFO = useRef();
  const history = useHistory();

  const [shipperInfo, setShipperInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);

  const shippers = useSelector((state) => state.shipper.shippers);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAll() {
      await dispatch(getShippers());
    }

    if (!shippers) {
      fetchAll();
    }
  }, [orderId, modalType]);

  useEffect(() => {
    if (isSucceed) {
      setIsSucceed(false);
    }
  }, [orderId, modalType]);

  const handleChangeInput = (e) => {
    const id = e.target.value;
    const shipper = shippers.find((shipper) => shipper.id === id);

    setShipperInfo({
      id,
      name: shipper.name,
      phone: shipper.phone,
    });
  };

  const renderBody = () => {
    if (!isSucceed) {
      return (
        <React.Fragment>
          <FormGroup>
            <Label for="exampleEmail">Shipper's Name</Label>

            <Input
              type="select"
              onChange={handleChangeInput}
              name="name"
              value={
                (shipperInfo && shipperInfo.id) ||
                (shipper && shipper.id) ||
                "DEFAULT"
              }
            >
              <option disabled value="DEFAULT">
                -- Select an option --
              </option>
              {shippers &&
                shippers.map((shipper) => (
                  <option key={shipper.id} value={shipper.id}>
                    {shipper.name}
                  </option>
                ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Shipper's Phone Number</Label>
            <Input
              type="number"
              name="phone"
              value={
                (shipperInfo && shipperInfo.phone) ||
                (shipper && shipper.phone) ||
                ""
              }
              disabled
            />
          </FormGroup>
        </React.Fragment>
      );
    } else {
      return (
        <div>
          Shipper's information is recorded. Please wait for the Shipper agent
          to pick up this order.
        </div>
      );
    }
  };

  const confirmRequest = async () => {
    if (modalType === OrderActionName.EDIT_SHIPPER_INFO) {
      setLoading(true);
      OrderApi.transferToShipper(orderId, shipperInfo.id).then(() => {
        dispatch(showSuccessMessage({ message: "Updated Successfully" }));
        setLoading(false);
        PREV_SHIPPER_INFO.current = shipperInfo.id;
        updateShipperInfo(shipperInfo);
      });
      return;
    }

    setLoading(true);
    OrderApi.updateOrderStatus(orderId)
      .then(() => {
        OrderApi.transferToShipper(orderId, shipperInfo.id).then(() => {
          setLoading(false);
          setIsSucceed(true);
          setShipperInfo(null);
        });
      })
      .catch(() => {
        dispatch(showFailedMessage());
      });
  };

  const redirect = () => {
    setShipperInfo(null);
    if (modalType === OrderActionName.TRANSFER_TO_SHIPPER && isSucceed) {
      history.push(`/admin/order/shipped?id=${orderId}`);
    }
  };

  return (
    <div
      className="modal fade modal-confirm"
      id="modalShipperInfo"
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
                  ? MESSAGE_ORDER.SUBMIT_SHIPPER_INFO_SUCCESS
                  : MESSAGE_ORDER.SUBMIT_SHIPPER_INFO}
              </b>
            </h6>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={redirect}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{renderBody()}</div>
          <div className="modal-footer">
            <ModalFooter
              isSucceed={isSucceed}
              loading={loading}
              confirmRequest={confirmRequest}
              resetData={() => setShipperInfo(null)}
              isDisabled={
                !shipperInfo ||
                !shipperInfo.name ||
                !shipperInfo.phone ||
                shipperInfo?.id === PREV_SHIPPER_INFO.current
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

ModalShipperInfo.propTypes = {};

export default React.memo(ModalShipperInfo);
