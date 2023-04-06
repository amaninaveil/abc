import CartIcon from "../../../components/main/Header/CartIcon/cartIcon";
import React from "react";

import UserIcon from "./userIcon";
import "./_info.scss";

function Info() {
  return (
    <div className="info-group d-flex">
      <CartIcon />
      <UserIcon />
    </div>
  );
}

export default Info;
