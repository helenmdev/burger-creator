import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "./Modal.css";

function ModalCreate(props) {
  const [additions, setAdditions] = useState("");

  const handleChange = (e) => {
    setAdditions(e.target.value);
  };

  const saveAdditions = () => {
    props.onSave(additions);
  };

  return (
    <Modal
      className="modal"
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        className="border border-warning-subtle bg-warning bg-gradient"
      >
        <Modal.Title id="contained-modal-title-vcenter" className="fs-5 text">
          Additional ingredients
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="border border-warning-subtle">
        <h6>Please indicate any other ingredient you want to add</h6>
        <textarea
          className="border border-secondary-subtle w-100 p-3 roundedtext textareamodal"
          defaultValue={additions}
          onChange={handleChange}
        />
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
