import React from "react";
import "./_btn.scss";

function BtnMore() {
  return (
    <button className="btn-tranform btn-learn-more btn-main ">
      <span className="name">View</span>
      <span className="icon">
        <i className="fas fa-search"></i>
      </span>
    </button>
  );
}

export default BtnMore;
