import React from "react";

// bootstrap
import Modal from "react-bootstrap/Modal";

const ModalHeader = ({ priority }) => {
  return (
    <Modal.Header closeButton>
      <Modal.Title>Add a {priority} priority ticket</Modal.Title>
    </Modal.Header>
  );
};

export default ModalHeader;
