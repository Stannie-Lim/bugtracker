import React from "react";
import { useSelector } from "react-redux";

// materialui
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";

const ProjectInput = ({ projectId, handleProjectChange }) => {
  const classes = useStyles();
  const projects = useSelector(({ projects }) => projects);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Project</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={projectId}
        required
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
              <Typography variant="subtitle2">{project.description}</Typography>
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default ProjectInput;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
