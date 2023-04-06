import React, { useEffect, useState } from "react";
import { Col, FormGroup, Input, Label, Row, Spinner } from "reactstrap";
import CustomerApi from "../../../api/customerApi";
import image from "../../../assets/images/headphone1.jpeg";
import formatFullyDate from "../../../helpers/formatFullyDateTime";
import handlePrice from "../../../helpers/formatPrice";
import { CustomerOrderStatus } from "../../../pages/Order/type";
import OrderRow from "../OrderRow/orderRow";
import "./_customerInfoModal.scss";

function CustomerInfoModal(props) {
  const { customerID } = props;

  const [customerInfo, setCustomerInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("placed-order");

  useEffect(() => {
    // setLoading(true);
    if (customerID) {
      CustomerApi.getCustomerInfo(customerID)
        .then((res) => {
          setCustomerInfo(res);
          // setLoading(false);
        })
        .catch(() => setCustomerInfo(null));
    }
  }, [customerID]);
  return (
    <div
      className="modal fade modal-customer-info"
      id="modalCustomerInfo"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="menuModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-xl"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title">
              <b>Customer Information</b>
            </h6>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div className="text-center">
                <Spinner />
              </div>
            ) : customerInfo ? (
              <div className="body">
                <div className="container-fluid user-info">
                  <Row className="align-items-center">
                    <Col xs="12" sm="4">
                      <div className="user-avatar d-flex justify-content-center mb-4">
                        <img src={image} alt="user avatar" />
                      </div>
                      <h5 className="header text-center">
                        {customerInfo.name}
                      </h5>
                    </Col>
                    <Col xs="12" sm="8">
                      <FormGroup
                        row
                        className="justify-content-center basic-info"
                      >
                        <Col xs={12} sm={8} className="bottom-gap">
                          <Label className="text-capitalize">Email</Label>
                          <Input
                            type="text"
                            name="name"
                            value={customerInfo.email}
                            disabled
                          />
                        </Col>
                        <Col xs={6} sm={4} className="bottom-gap">
                          <Label className="text-capitalize">Reward</Label>
                          <Input
                            type="text"
                            name="name"
                            value={customerInfo.reward}
                            disabled
                          />
                        </Col>

                        <Col xs={6} sm={4} className="bottom-gap">
                          <Label className="text-capitalize">DOB</Label>
                          <Input
                            type="text"
                            name="name"
                            value={formatFullyDate(customerInfo.dob)}
                            disabled
                          />
                        </Col>
                        <Col xs={6} sm={4} className="bottom-gap">
                          <Label className="text-capitalize">Phone</Label>
                          <Input
                            type="text"
                            name="name"
                            value={customerInfo.phone}
                            disabled
                          />
                        </Col>
                        <Col xs={6} sm={4} className="bottom-gap">
                          <Label className="text-capitalize">Gender</Label>
                          <Input
                            type="text"
                            name="name"
                            value={customerInfo.gender}
                            disabled
                          />
                        </Col>
                        <Col xs={12} className="bottom-gap">
                          <Label className="text-capitalize">Address</Label>
                          <Input
                            type="text"
                            name="name"
                            value={customerInfo.address}
                            disabled
                          />
                        </Col>

                        <Col xs={6} className="bottom-gap">
                          <Label className="text-capitalize">
                            Accumulative Order
                          </Label>
                          <Input
                            type="text"
                            name="name"
                            value={customerInfo.accumulativeOrder}
                            disabled
                          />
                        </Col>
                        <Col xs={6} className="bottom-gap">
                          <Label className="text-capitalize">
                            Accumulative Spending
                          </Label>
                          <Input
                            type="text"
                            name="name"
                            value={handlePrice(
                              customerInfo.accumulativeSpending
                            )}
                            disabled
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <div className="customer-orders">
                  <div className="orders-nav mb-4">
                    {Object.keys(CustomerOrderStatus).map((key, index) => (
                      <div
                        className={key === activeTab ? "btn-active" : ""}
                        key={index}
                        onClick={() => setActiveTab(key)}
                      >
                        <button>
                          {CustomerOrderStatus[key]}{" "}
                          {customerInfo.orders[key].length ? (
                            <span>{customerInfo.orders[key].length}</span>
                          ) : (
                            ""
                          )}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="separated-table customer-orders-table">
                    {customerInfo.orders[activeTab].length !== 0 ? (
                      <table className="w-100">
                        <thead>
                          <tr className="p-3">
                            <th className="number">No.</th>
                            <th className="id">ID</th>
                            <th className="last-confirm">Confirmed</th>
                            <th className="item">Item</th>
                            <th className="price">Total</th>
                            {activeTab ===
                            CustomerOrderStatus.cancelled.toLowerCase() ? (
                              <>
                                <th className="reason">Reason</th>
                                <th className="actor">Actor</th>
                              </>
                            ) : (
                              <th className="status">Status</th>
                            )}
                            <th className="text-center action">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {customerInfo.orders[activeTab].map(
                            (order, index) => (
                              <OrderRow
                                number={index + 1}
                                key={order.id}
                                order={order}
                                isCancelled={
                                  activeTab ===
                                  CustomerOrderStatus.cancelled.toLowerCase()
                                }
                              />
                            )
                          )}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center">No order is avaiable.</div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>No data for this customer</div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CustomerInfoModal);
