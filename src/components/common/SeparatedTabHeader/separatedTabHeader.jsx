import React from "react";
import { NavLink } from "react-router-dom";
import "./_separatedTabHeader.scss";
import { useLocation } from "react-router-dom";

function SeparatedTabHeader(props) {
  const { active, prevActive, header } = props;
  const pathname = useLocation().pathname;

  return (
    <div
      className={`separated-tab-header-container ${active ? "active" : ""} ${
        prevActive ? "prev-active" : ""
      }`}
    >
      <NavLink to={`${pathname}?type=${header.index}`}>
        <div className="header p-3">
          <i className="fas fa-tags mr-2"></i>
          {header.name}{" "}
          {header.dataLength > 0 && <span>{header.dataLength}</span>}
        </div>
      </NavLink>
    </div>
  );
}

SeparatedTabHeader.propTypes = {};

export default SeparatedTabHeader;
