import React from "react";
import { useDispatch } from "react-redux";
import { clearData } from "../../../utilities/slices/userSlice";

function SignOut(props) {
  const dispatch = useDispatch();

  const logout = () => {
    // cookiesService.removeCookies("user");
    // cookiesService.removeCookies("access");
    const prefix = localStorage.getItem("access") === "ADMIN" ? "/admin" : "";
    localStorage.removeItem("user");
    localStorage.removeItem("access");
    localStorage.removeItem("fullname");
    window.location.href = prefix === "" ? "/home" : "/admin/login";

    dispatch(clearData());
  };
  return (
    <div
      className="modal fade"
      id="signOutModal"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
      aria-labelledby="signoutModalLabel"
    >
      <div
        className="modal-dialog modal-sm modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Sign out</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">Are you sure?</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger btn-sm"
              data-dismiss="modal"
              onClick={logout}
            >
              Sign out
            </button>
            <button
              type="button"
              className="btn btn-success btn-sm"
              data-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

SignOut.propTypes = {};

export default SignOut;
