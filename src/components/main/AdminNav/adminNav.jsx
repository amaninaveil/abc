import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AdminNavList } from "./type";
import "./_adminNav.scss";

function AdminNav(props) {
  const pathname = useLocation().pathname;
  return (
    <div className="body-content nav-wrapper">
      <div className="nav">
        <ul>
          {AdminNavList.map((nav) => (
            <li key={nav.href}>
              <NavLink
                to={nav.href}
                activeClassName="active"
                className={`${
                  pathname.startsWith(nav.mainHref) ? "active" : ""
                }`}
              >
                <span className="menu-tab-icon">
                  <i className={nav.icon}></i>
                </span>
                <span className="text-capitalize">{nav.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

AdminNav.propTypes = {};

export default AdminNav;
