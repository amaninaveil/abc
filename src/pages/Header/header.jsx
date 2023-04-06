import React from "react";
import { useLocation } from "react-router-dom";
import DateTime from "../../components/AdminHeader/DateTimeDisplay/dateTime";
import UserInfo from "../../components/AdminHeader/UserInfo/userInfo";
import Menu from "../../components/main/Header/Menu/menu";
import Info from "./Info/info";
import Nav from "./Nav/nav";
import "./_header.scss";
import NotificationModal from "../../components/common/NotificationModal/notificationModal";
import { useSelector } from "react-redux";

function Header() {
  const isAdminPage = useLocation().pathname.startsWith("/admin")
    ? true
    : false;

  const notification = useSelector((state) => state.notification);
  return (
    <>
      <header
        className={`header d-flex fixed-top ${isAdminPage ? "" : "customer"}`}
      >
        <Menu />
        {isAdminPage ? (
          <>
            <DateTime />
            <UserInfo />
          </>
        ) : (
          <>
            <Nav />
            <Info />
          </>
        )}
      </header>
      <NotificationModal notification={notification} />
    </>
  );
}

export default React.memo(Header);
