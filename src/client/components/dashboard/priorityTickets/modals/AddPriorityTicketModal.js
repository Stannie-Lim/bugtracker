import React, { useState } from "react";

// bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// materialui
import TextField from "@material-ui/core/TextField";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

const AddPriorityTicketModal = ({
  modalVisible,
  setModalVisible,
  priority,
}) => {
  const [type, setType] = useState("");
  const [info, setInfo] = useState("");

  const closeModal = () => setModalVisible(!modalVisible);

  const submit = () => {
    console.log(type, info);
  };

  return (
    <Modal show={modalVisible} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add a {priority} priority ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <TextField
            id="outlined-basic-1"
            label="Type"
            type="text"
            variant="outlined"
            margin="dense"
            value={type}
            onChange={({ target }) => setType(target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic-2"
            label="Info"
            type="text"
            variant="outlined"
            margin="dense"
            value={info}
            onChange={({ target }) => setInfo(target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={submit}>
          Add Ticket
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPriorityTicketModal;
