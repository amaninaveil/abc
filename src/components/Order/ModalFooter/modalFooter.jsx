import React from "react";
import { Spinner } from "reactstrap";
import PropTypes from "prop-types";

function ModalFooter(props) {
  const { isSucceed, loading, confirmRequest, isDisabled, resetData } = props;
  return (
    <>
      {!isSucceed ? (
        loading ? (
          <Spinner />
        ) : (
          <>
            <button
              type="button"
              className="btn btn-primary"
              onClick={confirmRequest}
              disabled={isDisabled}
            >
              OK
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={resetData}
            >
              Cancel
            </button>
          </>
        )
      ) : (
        ""
      )}
    </>
  );
}

ModalFooter.propTypes = { isDisabled: PropTypes.bool };
ModalFooter.defaultProps = {
  isDisabled: false,
};

export default ModalFooter;
