import React, { useState } from "react";

// bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// materialui
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

const MiddleColumn = ({
  user,
  setEditNameVisibility,
  setEditEmailVisibility,
  setEditPasswordVisibility,
  editNameVisibility,
  editEmailVisibility,
  editPasswordVisibility,
}) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const handleClose = () => setEditNameVisibility(false);
  const handleShow = () => setEditNameVisibility(true);

  return (
    <div className="column">
      <Typography variant="h6" className="middle-column-text" gutterBottom>
        {user.fullName}
      </Typography>
      <Typography variant="h6" className="middle-column-text" gutterBottom>
        {user.email}
      </Typography>
      <Typography variant="h6" className="middle-column-text" gutterBottom>
        {user.email}
      </Typography>

      <div>
        <Modal show={editNameVisibility} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default MiddleColumn;

// <form>
//   <TextField id="outlined-basic" label="Outlined" variant="outlined" value={ firstName } onChange={ ({ target }) => setFirstName(target.value) } />
//   <TextField id="outlined-basic" label="Outlined" variant="outlined" value={ lastName } onChange={ ({ target }) => setLastName(target.value) } />
// </form>
