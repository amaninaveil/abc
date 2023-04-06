import React from "react";
import Navbar from "../../components/Order/NavBar/navbar";
import OrderContent from "./OrderContent/main";

function OrderPage(props) {
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-3 p-0">
          <Navbar />
        </div>
        <div className="col-9 p-4" style={{ backgroundColor: "white", minHeight:' 90vh' }}>
          <OrderContent />
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
