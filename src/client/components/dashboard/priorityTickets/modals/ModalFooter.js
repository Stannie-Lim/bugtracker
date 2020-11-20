import React from "react";

// bootstrap
import Modal from "react-bootstrap/Modal";

// materialui
import Button from "react-bootstrap/Button";

const ModalFooter = ({ closeModal, submit }) => {
  return (
    <Modal.Footer>
      <Button variant="secondary" onClick={closeModal}>
        Close
      </Button>
      <Button variant="primary" onClick={submit}>
        Add Ticket
      </Button>
    </Modal.Footer>
  );
};

export default ModalFooter;
