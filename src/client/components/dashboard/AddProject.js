import React, { useState } from "react";
import { useDispatch } from "react-redux";

// store
import { createProject } from "../../store/store";

// materialui
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
    <div className="main">
      <form onSubmit={addProject}>
        <TextField
          label="Title"
          id="outlined-size-normal"
          variant="outlined"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          required={true}
        />
        <TextField
          label="Description"
          id="outlined-size-normal"
          variant="outlined"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          required={true}
        />
        <button>Create a new project</button>
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
