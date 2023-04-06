import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Col, FormGroup, Input, Row } from "reactstrap";
import UserApi from "../../api/userApi";
import image from "../../assets/images/footer1.gif";
import {
  showFailedMessage,
  showSuccessMessage
} from "../../utilities/slices/notificationSlice";
import { login, updateLoggedInStatus } from "../../utilities/slices/userSlice";
import "./_login.scss";

function Login() {
  const location = useLocation();
  const history = useHistory();
  const [info, setInfo] = useState({});
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [alert, setAlert] = useState({});

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
      await dispatch(login(info));
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
    const prefix = localStorage.getItem("access") === "ADMIN" ? "/admin" : "";

    // const prefix =
    //   cookiesService.getCookies("access") === "ADMIN" ? "/admin" : "";
    if (isLoggedIn) {
      if (location.state?.referrer.pathname) {
        history.push(location.state.referrer.pathname);
      } else history.push(`${prefix}/home`);
    }
  }, [isLoggedIn, history, location, dispatch]);

  const signup = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    let userInfo;
    for (let [key, value] of formData.entries()) {
      userInfo = { ...userInfo, [key]: value };
    }

    UserApi.signup(userInfo)
      .then(() => {
        dispatch(showSuccessMessage({ message: "Created Successfully!" }));
        setInfo({ email: userInfo.email });
        event.target.reset();
        setIsLoginForm(true);
      })
      .catch((err) => {
        if (!err) {
          dispatch(
            showFailedMessage({
              message: "Poor connection. Please try again after a while.",
            })
          );
        } else {
          dispatch(showFailedMessage({ message: err }));
        }
      });
  };

  const handleValidate = (e) => {
    if (alert?.error) {
      const newAlert = { ...alert };
      delete newAlert.error;
      setAlert(newAlert);
    }
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "email":
        break;
      case "pswd":
        if (value.length < 8 || value.length > 20) {
          setAlert({
            ...alert,
            pswd: "The length of your password must be greater than 8 and less than 20",
          });
        } else {
          const newAlert = { ...alert };
          delete newAlert.pswd;
          setAlert(newAlert);
        }
        break;
      case "phone":
        if (value.length !== 10) {
          setAlert({
            ...alert,
            phone: "Your phone number is invalid.",
          });
        } else {
          const newAlert = { ...alert };
          delete newAlert.phone;
          setAlert(newAlert);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="row login">
      <div
        className={`col-6 signup-wrapper px-0 ${
          isLoginForm ? "" : "signup-wrapper-background"
        }`}
      >
        <img src={image} alt="" className="login-background-image" />
        <div className="signup-wrapper-content">
          {/* <img src={avatar} alt="" className="signup-icon" /> */}
          <div className="add-img-btn">
            <div className="content">
              <i className="far fa-images"></i>
              <div>+ Add Avatar</div>
            </div>
          </div>
          <div className="container-fluid">
            <Row>
              <Col className="line-deco p-0"></Col>
              <Col className="title p-0">Create New Account</Col>
              <Col className="line-deco p-0"></Col>
            </Row>
          </div>
          <form onSubmit={signup}>
            <FormGroup>
              <Input
                name="email"
                required
                placeholder="Email"
                onBlur={handleValidate}
              />
              <div className="text-danger error">
                <small>{alert?.email}</small>
              </div>
            </FormGroup>
            <FormGroup>
              <Input
                name="pswd"
                required
                type="password"
                onBlur={handleValidate}
                placeholder="Password"
              />
              <div className="text-danger error">
                <small>{alert?.pswd}</small>
              </div>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    name="fullname"
                    required
                    type="text"
                    onBlur={handleValidate}
                    placeholder="Fullname"
                  />
                </Col>
                <Col>
                  <Input
                    name="phone"
                    required
                    type="text"
                    onBlur={handleValidate}
                    placeholder="Phone"
                  />
                  <div className="text-danger error">
                    <small>{alert?.phone}</small>
                  </div>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col>
                  <Input
                    name="dob"
                    required
                    onBlur={handleValidate}
                    type="date"
                    placeholder="DOB"
                  />
                </Col>
                <Col>
                  <Input
                    type="select"
                    name="gender"
                    required
                    onBlur={handleValidate}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="othert">Other</option>
                  </Input>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Input
                name="address"
                required
                type="text"
                onBlur={handleValidate}
                placeholder="Address"
              />
            </FormGroup>
            <div className="action d-flex justify-content-around">
              <div className="text-center">
                <Button
                  onClick={() => setIsLoginForm(true)}
                  className="btn-sign-in"
                >
                  Sign In
                </Button>
              </div>
              <div className="text-center">
                <Button
                  className="btn-sign-up"
                  type="submit"
                  disabled={alert && Object.keys(alert).length !== 0}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className={`col-6 login-wrapper px-0 ${
          isLoginForm ? "" : "login-wrapper-background"
        }`}
      >
        <div className="login-wrapper-content">
          <div className="login-title">Welcome to TechShop</div>
          <form>
            <p>Email</p>
            <input
              name="email"
              onChange={handleChangeInputText}
              required
              placeholder="Enter your email"
              defaultValue={info.email || ""}
            />
            <p>Password</p>
            <input
              name="pswd"
              onChange={handleChangeInputText}
              required
              type="password"
              placeholder="Enter your password"
            />
            <div className="text-center">
              <button onClick={handleSubmit} className="btn">
                Get Started
              </button>
            </div>
          </form>
          <div className="text-center">
            <button
              onClick={() => setIsLoginForm(false)}
              className="btn-sign-up"
            >
              Create a new account
            </button>
          </div>
          <div>{error}</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
