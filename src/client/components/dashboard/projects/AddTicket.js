import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// store
import { createTicket } from "../../../store/store";

// materialui
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

const AddTicket = ({ match, history }) => {
  const types = ["Bug", "Error", "Feature Request", "To-Do"];
  const priorities = ["None", "Low", "Medium", "High"];
  const classes = useStyles();

  const [info, setInfo] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const [priority, setPriority] = useState("");

  const addTicket = (ev) => {
    ev.preventDefault();

    const hasError = checkError();
    if (hasError) return;

    makeTicket();
  };

  const checkError = () => {
    setError("");
    if (type === "") {
      setError("Please select a type from the dropdown menu");
      return true;
    } else if (priority === "") {
      setError("Please select a priority from the dropdown menu");
      return true;
    }
    return false;
  };

  const dispatch = useDispatch();
  const makeTicket = () => {
    const { projectId } = match.params;
    dispatch(createTicket(info, type, priority, projectId));
    history.push(`/projects/${projectId}`);
  };

  return (
    <div className="main">
      <h1>{error}</h1>
      <div className="create-project-form">
        <form onSubmit={addTicket} className={classes.formControl}>
          <div>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={type}
              onChange={({ target }) => setType(target.value)}
              displayEmpty
              required={true}
            >
              <MenuItem value="" disabled>
                Type
              </MenuItem>
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={priority}
              onChange={({ target }) => setPriority(target.value)}
              displayEmpty
              required={true}
            >
              <MenuItem value="" disabled>
                Priority
              </MenuItem>
              {priorities.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <TextField
              label="Information"
              id="filled-multiline-static"
              multiline
              rows={5}
              variant="outlined"
              value={info}
              onChange={({ target }) => setInfo(target.value)}
              required={true}
              margin="dense"
              className="create-project-text-field"
            />
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              classes={{ root: classes.button }}
            >
              Create a new ticket
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTicket;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  button: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
}));
