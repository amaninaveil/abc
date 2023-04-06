import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./_categories.scss";

function Categories() {
  const stateCategories = useSelector((state) => state.category);

  const renderCategoryTable = (categories) => {
    return categories.length !== 0
      ? categories.map((category, index) => (
          <NavLink
            activeClassName="active"
            to={`/product/${category.slug}`}
            key={category.slug}
          >
            <li>
              {category.img ? (
                <img
                  src={`${process.env.REACT_APP_API_URL}${category.img}`}
                  alt=""
                  className="mr-2"
                />
              ) : (
                ""
              )}
              {category.name}
            </li>
          </NavLink>
        ))
      : "";
  };
  return (
    <div className="option-table">
      <div className="option-table-heading">CATEGORIES</div>
      <div className="option-table-content category-table filter-table">
        <ul>
          {renderCategoryTable(stateCategories.data)}
          <NavLink activeClassName="active" to={`/product/all`}>
            <li>All</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
export default Categories;
