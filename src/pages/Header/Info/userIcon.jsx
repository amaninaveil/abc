import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import avatar from "../../../assets/images/avatar.jpg";
import "./_userIcon.scss";

function UserIcon() {
  const { isLoggedIn } = useSelector((state) => state.user.data);
  
  const renderUserModal = () => {
    return (
      <div className="dropdown">
        <NavLink to={`/profile`}>Profile</NavLink>
        <NavLink to={`/your-orders/placed-order`}>Your Orders</NavLink>
        <NavLink to={`/wish-list`}>Wish List</NavLink>
        <div data-toggle="modal"
          data-target="#signOutModal">Logout</div>
      </div>
    );
  };
  const renderAvatar = (loginStatus) => {
    return loginStatus ? (
      <div className="dropdown-switcher">
        <NavLink activeClassName="active" to="/profile">
          <img src={avatar} alt="User Avatar" />
        </NavLink>
        {renderUserModal()}
      </div>
    ) : (
      <NavLink activeClassName="active" to="/login">
        <i className="fa fa-user"></i>
      </NavLink>
    );
  };
  return <div className="user-icon">{renderAvatar(isLoggedIn)}</div>;
}

UserIcon.propTypes = {};

export default UserIcon;
