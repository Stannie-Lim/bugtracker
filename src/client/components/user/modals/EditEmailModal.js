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
import { changeEmail } from "../../../store/store";

const EditEmailModal = ({
  user,
  editEmailVisibility,
  setEditEmailVisibility,
}) => {
  const [email, setEmail] = useState(user.email);

  const handleClose = () => setEditEmailVisibility(false);

  const dispatch = useDispatch();
  const submit = () => {
    handleClose();
    dispatch(changeEmail(email));
  };

  return (
    <Modal show={editEmailVisibility} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Your Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            margin="dense"
            onChange={({ target }) => setEmail(target.value)}
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

export default EditEmailModal;
