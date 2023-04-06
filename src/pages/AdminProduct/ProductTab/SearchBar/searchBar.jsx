import React from "react";
import { Input } from "reactstrap";
import "./_searchBar.scss";

function SearchBar(props) {
  const { updateSearchInput } = props;
  return (
    <div className="admin-search-bar px-2">
      <span className="search-icon">
        <i className="fas fa-search"></i>
      </span>
      <Input
        type="text"
        name="search"
        onChange={(e) => updateSearchInput(e.target.value)}
      />
      <span aria-hidden="true" className="delete-btn">
        &times;
      </span>
    </div>
  );
}

SearchBar.propTypes = {};

export default React.memo(SearchBar);
