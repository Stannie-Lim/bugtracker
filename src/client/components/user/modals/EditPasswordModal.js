import React, { useState } from "react";

// bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// materialui
import TextField from "@material-ui/core/TextField";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

const EditPasswordModal = ({
  user,
  editPasswordVisibility,
  setEditPasswordVisibility,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleClose = () => setEditPasswordVisibility(false);

  const submit = () => {
    handleClose();
    console.log(oldPassword, newPassword);
  };

  return (
    <Modal show={editPasswordVisibility} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Your Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <TextField
            id="outlined-basic-1"
            label="Old Password"
            type="password"
            variant="outlined"
            value={oldPassword}
            margin="dense"
            onChange={({ target }) => setOldPassword(target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic-2"
            label="New Password"
            type="password"
            variant="outlined"
            value={newPassword}
            margin="dense"
            onChange={({ target }) => setNewPassword(target.value)}
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

export default EditPasswordModal;
