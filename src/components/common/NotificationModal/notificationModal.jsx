import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { Modal } from "react-bootstrap";
import { hideMessage } from "../../../utilities/slices/notificationSlice";
import { NotificationType } from "./type";
import { useDispatch } from "react-redux";

function NotificationModal(props) {
  const { notification } = props;
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (notification.type) {
      setShow(true);
    }
  }, [notification.type]);

  const handleClose = () => {
    setShow(false);
    dispatch(hideMessage());
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          className={`${
            notification?.type === NotificationType.SUCCESS_NOTIFICATION
              ? "text-success"
              : "text-danger"
          }`}
        >
          {notification?.type}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{notification?.message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

NotificationModal.propTypes = {};

export default React.memo(NotificationModal);
