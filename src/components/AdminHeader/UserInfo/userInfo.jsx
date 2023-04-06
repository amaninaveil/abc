import React from "react";
import "./_userInfo.scss";
import { useSelector } from "react-redux";
import avatar from "../../../assets/images/avatar.jpg";
import { NavLink } from "react-router-dom";

function UserInfo(props) {
  const { isLoggedIn } = useSelector((state) => state.user.data);

  const renderAvatar = (loginStatus) => {
    return loginStatus ? (
      <div className="dropdown-switcher">
        {/* <NavLink activeClassName="active" to="/profile"> */}
        <img src={avatar} alt="User Avatar" />
        {/* </NavLink> */}
      </div>
    ) : (
      <NavLink activeClassName="active" to="/admin/login">
        <i className="fa fa-user"></i>
      </NavLink>
    );
  };
  return (
    <>
      <div className="function-icon d-flex flex-direction-row align-items-center">
        {isLoggedIn ? (
          <>
            <div>
              Hi!{" "}
              <span className="username">
                {localStorage.getItem("fullname")}
              </span>
            </div>
            <div data-toggle="modal" data-target="#signOutModal">
              <i className="fa fa-sign-out mx-4" aria-hidden="true"></i>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="avatar-user">{renderAvatar(isLoggedIn)}</div>
      </div>
    </>
  );
}

UserInfo.propTypes = {};

export default UserInfo;
