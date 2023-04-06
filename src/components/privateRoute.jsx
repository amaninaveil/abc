import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { updateLoggedInStatus } from "../utilities/slices/userSlice";
/**
 * restData like path, exact
 *
 * TODO: authentication to direct user to login or children component
 */
function PrivateRoute({ children, ...restData }) {
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  // const status = cookiesService.getCookies("user");
  // const role = cookiesService.getCookies("access")
  const status = localStorage.getItem("user");
  const role = localStorage.getItem("access");

  const checkLoggedInStatus = (status, isLoggedIn) => {
    if (status === undefined && isLoggedIn)
      dispatch(updateLoggedInStatus({ isLoggedIn: false }));
  };

  checkLoggedInStatus(status, isLoggedIn);

  const redirectRoute = (children) => {
    // logged in
    if (status) {
      const prefix = role === "ADMIN" ? "/admin" : "";
      if (location.pathname.startsWith("/admin") && role === "ADMIN") {
        return children;
      }
      if (!location.pathname.startsWith("/admin") && role === "CUSTOMER") {
        return children;
      }
      return (
        <Redirect
          to={{
            pathname: `${prefix}/home`,
          }}
        />
      );
    }

    // have not logged in yet
    const prefix = location.pathname.startsWith("/admin") ? "/admin" : "";
    return (
      <Redirect
        to={{
          pathname: `${prefix}/login`,
          state: { referrer: location },
        }}
      />
    );
  };
  return <Route {...restData}>{redirectRoute(children)}</Route>;
}

PrivateRoute.propTypes = {};

export default PrivateRoute;
