import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Search from "../Search/search";
import "./_nav.scss";
import { getCategories } from "../../../utilities/slices/categorySlice";

function Nav(props) {
  const stateCategories = useSelector((state) => state.category);
  const dispatch = useDispatch();

  // get categories
  useEffect(() => {
    async function fetchCategories() {
      await dispatch(getCategories());
    }
    if (!stateCategories.data.length) {
      fetchCategories();
    }
  }, [dispatch, stateCategories.data]);

  const renderCategoryModal = (categories) => {
    return categories.length !== 0
      ? categories.map((category, index) => (
          <Col key={index} xs="4" sm="4" md="4" lg="4" className="mb-2">
            <NavLink
              to={`/product${category.slug ? `/${category.slug}` : ""}`}
              activeClassName="active"
              exact={category.exact}
            >
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
            </NavLink>
          </Col>
        ))
      : "";
  };

  return (
    <div className="nav-bar d-flex">
      <Search />
      <nav className="nav">
        <ul>
          <li>
            <NavLink activeClassName="active" to="/home" exact>
              Home
            </NavLink>
          </li>
          <li className="dropdown-switcher">
            <NavLink activeClassName="active" to="/product/all">
              Products
            </NavLink>
            <div className="dropdown">
              <Row>
                {renderCategoryModal(stateCategories.data)}
                <Col xs="4" sm="4" md="4" lg="4" className="mb-2">
                  <NavLink to={`/product/all`} activeClassName="active">
                    All
                  </NavLink>
                </Col>
              </Row>
            </div>
          </li>
          <li>
            <NavLink activeClassName="active" to="/shopping-cart">
              Shopping Cart
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/wish-list">
              Wish List
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/your-orders/handling">
              Your Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
