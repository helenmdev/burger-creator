import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "./Modal.css";
import { Outlet } from "react-router-dom";

function ModalCreate(props) {
  const [additions] = useState("");

  const saveAdditions = () => {
    props.onSave(additions);
  };

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal"
    >
      <Modal.Header
        closeButton
        className="border border-warning-subtle bg-warning bg-gradient"
      />
      <Modal.Body>
        <Outlet />
      </Modal.Body>
      <Modal.Footer>
        <Button className="btnmodal" onClick={saveAdditions}>
          Save
        </Button>
        <Button className="btnmodal" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCreate;
