import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// store
import { createTicket, getProjects } from "../../../../store/store";

// bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// materialui
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
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
  const [projectId, setProjectId] = useState("");

  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(getProjects());
  };

  const projects = useSelector(({ projects }) => projects);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleProjectChange = (event) => {
    setProjectId(event.target.value);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const submit = () => {
    closeModal();
    dispatch(createTicket(info, type, priority, projectId));
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
            onChange={handleTypeChange}
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

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Project</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={projectId}
            onChange={handleProjectChange}
          >
            {projects &&
              projects.map((project) => (
                <MenuItem
                  key={project.id}
                  value={project.id}
                  className="add-ticket-project-list"
                >
                  <Typography variant="subtitle1">{project.title}</Typography>
                  <Typography variant="subtitle2">
                    {project.description}
                  </Typography>
                </MenuItem>
              ))}
          </Select>
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
