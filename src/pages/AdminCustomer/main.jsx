import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import CustomerInfoModal from "../../components/AdminCustomer/CustomerInfoModal/customerInfoModal";
import CustomerRow from "../../components/AdminCustomer/CustomerRow/customerRow";
import { getCustomers } from "../../utilities/slices/customerSlice";
import SearchBar from "../AdminProduct/ProductTab/SearchBar/searchBar";
import "./_adminCustomer.scss";

function AdminCustomer(props) {
  const dispatch = useDispatch();

  const listCustomers = useSelector((state) => state.customer.customers);

  const handleChangeInput = () => {};
  const [customerID, setCustomerID] = useState();

  useEffect(() => {
    const fetchAllCustomers = () => {
      dispatch(getCustomers());
    };
    if (!listCustomers) {
      fetchAllCustomers();
    }
  }, [dispatch]);

  return (
    <>
      <div className="body-content">
        <div className="separated-tab">
          <div className="admin-customer ">
            <div className="header container-fluid">
              <Row>
                <Col sm="5" xs="12" className="p-0">
                  <h3 className="title">
                    Customer
                    <span>
                      <small>
                        {listCustomers && listCustomers.length
                          ? `(${listCustomers.length})`
                          : ""}
                      </small>
                    </span>
                  </h3>
                </Col>
                <Col sm="7" xs="12" className="p-0">
                  <div className="search-bar d-flex justify-content-end">
                    <div className="search-area">
                      <SearchBar updateSearchInput={handleChangeInput} />
                    </div>
                    <FormGroup row className="justify-content-center ml-3">
                      <Label sm={4} className="text-capitalize">
                        Reward:
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="select"
                          defaultValue="DEFAULT"
                          onChange={handleChangeInput}
                        >
                          <option value="DEFAULT">All</option>
                          <option>Diamond</option>
                          <option>Gold</option>
                          <option>Silver</option>
                        </Input>
                      </Col>
                    </FormGroup>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="separated-table customer-table">
              {listCustomers && listCustomers.length > 0 ? (
                <table className="w-100">
                  <thead>
                    <tr className="p-3">
                      <th className="number">No.</th>
                      <th className="name text-center">Name</th>
                      <th className="email">Email</th>
                      <th className="phone">Phone</th>
                      <th className="reward">Reward</th>
                      <th className="text-center action">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listCustomers.map((customer, index) => (
                      <CustomerRow
                        number={index + 1}
                        key={customer.id}
                        customer={customer}
                        updateCustomerId={(id) => setCustomerID(id)}
                      />
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center">No customer is available</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CustomerInfoModal customerID={customerID} />
    </>
  );
}

AdminCustomer.propTypes = {};

export default AdminCustomer;
