import React, { useState } from "react";
import { useDispatch } from "react-redux";

// bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// materialui
import TextField from "@material-ui/core/TextField";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// store
import { changeName } from "../../../store/store";

const EditNameModal = ({ user, editNameVisibility, setEditNameVisibility }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const handleClose = () => setEditNameVisibility(false);

  const dispatch = useDispatch();
  const submit = () => {
    handleClose();
    dispatch(changeName(firstName.trim(), lastName.trim()));
  };

  return (
    <Modal show={editNameVisibility} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Your Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <TextField
            id="outlined-basic-1"
            label="First Name"
            variant="outlined"
            value={firstName}
            margin="dense"
            onChange={({ target }) => setFirstName(target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic-2"
            label="Last Name"
            variant="outlined"
            value={lastName}
            margin="dense"
            onChange={({ target }) => setLastName(target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={submit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditNameModal;
