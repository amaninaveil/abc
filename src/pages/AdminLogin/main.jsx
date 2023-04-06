import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  adminLogin,
  updateLoggedInStatus
} from "../../utilities/slices/userSlice";
import "./_adminLogin.scss";

function AdminLogin(props) {
  const location = useLocation();
  const history = useHistory();
  const [info, setInfo] = useState({});
  const { isLoggedIn, error } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const handleChangeInputText = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    async function submitToLogin() {
      await dispatch(adminLogin(info));
    }
    submitToLogin();
  };

  useEffect(() => {
    const checkLoggedInStatus = () => {
      // const status = cookiesService.getCookies("user");
      const status = localStorage.getItem("user");
      if (status === undefined && isLoggedIn)
        dispatch(updateLoggedInStatus({ isLoggedIn: false }));
    };
    checkLoggedInStatus();
    // const prefix =
    //   cookiesService.getCookies("access") === "ADMIN" ? "/admin" : "";
    const prefix = localStorage.getItem("access") === "ADMIN" ? "/admin" : "";
    if (isLoggedIn) {
      if (location.state?.referrer.pathname) {
        history.push(location.state.referrer.pathname);
      } else {
        history.push(`${prefix}/home`);
      }
    }
  }, [isLoggedIn, history, location, dispatch]);

  return (
    <div className="loginBackground container-fluid">
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm-8 d-flex">
          <div className="animationBg">
            <div className="loginForm" id="loginForm">
              <p className="loginTitle">Welcome back</p>
              <p>Email</p>
              <input
                name="email"
                onChange={handleChangeInputText}
                required
                placeholder="Enter your email"
              />
              <p>Password</p>
              <input
                name="pswd"
                onChange={handleChangeInputText}
                required
                type="password"
                placeholder="Enter your password"
              />
              <div className="text-center mb-4">
                <button onClick={handleSubmit} className="btn login-btn">
                  Get Started
                </button>
              </div>
            </div>
            <div className="text-danger">{error}</div>
          </div>
        </div>
        <div className="col-sm"></div>
      </div>
    </div>
  );
}

AdminLogin.propTypes = {};

export default AdminLogin;
