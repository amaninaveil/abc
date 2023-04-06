import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import ReportApi from "../../api/reportApi";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import "./_adminHome.scss";
import handlePrice from "../../helpers/formatPrice";
import MonthDetailRevenue from "../../components/AdminHome/MonthDetailRevenue/monthDetailRevenue";

function AdminHome(props) {
  const MONTH = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octorber",
    "November",
    "December",
  ];

  const [information, setInformation] = useState();
  const [year, setYear] = useState(2021);
  const [monthRevenue, setMonthRevenue] = useState();
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const [month, setMonth] = useState();

  useEffect(() => {
    ReportApi.getYearInformation(year).then((res) => {
      setInformation(res);
    });
  }, []);

  const getNewInformation = () => {
    ReportApi.getYearInformation(year).then((res) => {
      setInformation(res);
    });
  };

  const getMonthDetail = (month) => {
    setMonth(month);
    ReportApi.getMonthDetail(month + 1, year).then((res) => {
      setMonthRevenue(res);
    });
  };

  return (
    <div className="body-content admin-report">
      <h2 className="header text-center">Revenue</h2>
      <div className="container-fluid">
        <Row>
          <Col sm="1" className="p-0 d-flex flex-column">
            <FormGroup className="text-center">
              <Label>Year</Label>
              <Input
                type="number"
                name="month"
                min="2020"
                max="2100"
                step="1"
                onKeyDown={(e) =>
                  symbolsArr.includes(e.key) && e.preventDefault()
                }
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </FormGroup>
            <button className="btn" onClick={getNewInformation}>
              Submit
            </button>
          </Col>
          <Col sm="10">
            <Bar
              data={{
                labels: MONTH,
                datasets: [
                  {
                    label: "million",
                    data: information?.revenue || [],
                    backgroundColor: "rgba(255, 150, 165, 0.2)",
                    borderColor: "rgb(255, 150, 165)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: "Revenue" + year,
                },
                legend: {
                  display: true,
                  position: "right",
                },
                onClick: function (evt, element) {
                  if (element.length > 0) {
                    getMonthDetail(element[0].index);
                  }
                },
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={2}></Col>
          <Col sm={8} className="px-5">
            {information ? (
              <Row>
                <Col sm={4} className="col-container">
                  <div className="col-content wedding-static">
                    <div className="col-title">
                      <i className="fa fa-heart icon" aria-hidden="true"></i>{" "}
                      Total Revenue
                    </div>
                    <h4 id="wedding">
                      {handlePrice(information.totalRevenue)}
                    </h4>
                  </div>
                </Col>
                <Col sm={4} className="col-container">
                  <div className="col-content revenue-static">
                    <div className="col-title">
                      <i className="fa fa-heart icon" aria-hidden="true"></i>
                      Highlight Month
                    </div>
                    <h4 id="wedding" className="text-capitalize">
                      {information.highlightMonth}
                    </h4>
                  </div>
                </Col>
                <Col sm={4} className="col-container">
                  <div className="col-content employee-static">
                    <div className="col-title">
                      <i className="fa fa-heart icon" aria-hidden="true"></i> 1
                      <sup className="text-lowercase">st</sup> Revenue
                    </div>
                    <h4 id="wedding">
                      {handlePrice(information.highestRevenue)}
                    </h4>
                  </div>
                </Col>
                <Col sm={4} className="col-container">
                  <div className="col-content food-static">
                    <div className="col-title">
                      <i className="fa fa-heart icon" aria-hidden="true"></i>{" "}
                      Total Invoices
                    </div>
                    <h4 id="wedding">{information.totalInvoices}</h4>
                  </div>
                </Col>
                <Col sm={4} className="col-container">
                  <div className="col-content service-static">
                    <div className="col-title">
                      <i className="fa fa-heart icon" aria-hidden="true"></i>{" "}
                      Customer
                    </div>
                    <h4 id="wedding">{information.totalCustomers}</h4>
                  </div>
                </Col>
                <Col sm={4} className="col-container">
                  <div className="col-content lobby-static">
                    <div className="col-title">
                      <i className="fa fa-heart icon" aria-hidden="true"></i>{" "}
                      Product
                    </div>
                    <h4 id="wedding">{information.totalProducts}</h4>
                  </div>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
      <MonthDetailRevenue
        data={monthRevenue}
        month={MONTH[month]}
        year={year}
      />
    </div>
  );
}

AdminHome.propTypes = {};

export default AdminHome;
