import React, { useState } from "react";

// bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// materialui
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

const AddPriorityTicketModal = ({
  modalVisible,
  setModalVisible,
  priority,
}) => {
  const [info, setInfo] = useState("");
  const [type, setType] = useState("BUG");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const submit = () => {
    closeModal();
    console.log(type, info);
  };

  return (
    <Modal show={modalVisible} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add a {priority} priority ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl component="fieldset">
          <FormLabel component="legend">Type</FormLabel>
          <RadioGroup
            aria-label="type"
            name="type1"
            value={type}
            onChange={handleChange}
          >
            <FormControlLabel value="BUG" control={<Radio />} label="Bug" />
            <FormControlLabel value="ERROR" control={<Radio />} label="Error" />
            <FormControlLabel
              value="FEATURE_REQUEST"
              control={<Radio />}
              label="Feature Request"
            />
            <FormControlLabel value="TODO" control={<Radio />} label="To do" />
          </RadioGroup>
        </FormControl>
        <div>
          <TextField
            id="outlined-basic-2"
            label="Information"
            type="text"
            variant="outlined"
            margin="dense"
            required
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
