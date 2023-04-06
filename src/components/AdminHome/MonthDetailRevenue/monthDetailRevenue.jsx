import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Modal } from "react-bootstrap";
import MonthRevenueRow from "../MonthRevenueRow/monthRevenueRow";
import './_monthDetailRevenue.scss'

function MonthDetailRevenue(props) {
  const { data, month, year } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    if (data) {
      setShow(true);
    }
  }, [data]);
  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      animation={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Revenue Report {month} {year}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data && data.length > 0 ? (
          <table className="table table-md month-detail-revenue">
            <thead>
              <tr>
                <th>No.</th>
                <th>Date</th>
                <th>Completed Invoices</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data.map((invoices, index) => (
                <MonthRevenueRow
                  invoices={invoices}
                  number={index + 1}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div>No data for this month</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

MonthDetailRevenue.propTypes = {};

export default MonthDetailRevenue;
