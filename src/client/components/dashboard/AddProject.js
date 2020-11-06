import React, { useState } from "react";
import { useDispatch } from "react-redux";

// store
import { createProject } from "../../store/store";

// css
import "./addProject.css";

// materialui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const AddProject = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const addProject = (ev) => {
    ev.preventDefault();
    dispatch(createProject(title, description));
    history.push("/projects");
  };

  const classes = useStyles();
  return (
    <div className="create-project-form">
      <form onSubmit={addProject}>
        <div>
          <TextField
            label="Title"
            id="outlined-size-normal"
            variant="outlined"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required={true}
            margin="dense"
            className="create-project-text-field"
          />
        </div>
        <div>
          <TextField
            label="Description"
            id="filled-multiline-static"
            multiline
            rows={5}
            variant="outlined"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            required={true}
            margin="dense"
            className="create-project-text-field"
          />
        </div>
        <div className="create-project-button">
          <Button variant="contained" color="primary">
            Create a new project
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;

// css
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));
