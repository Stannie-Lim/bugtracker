import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// store
import { getProjects } from "../../store/store";

// components
import ProjectCard from "./cards/ProjectCard";

// css
import "./projects.css";

// materialui
import Button from "@material-ui/core/Button";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";

const Projects = ({ history }) => {
  const dispatch = useDispatch();
  const findProjects = async () => {
    dispatch(getProjects());
  };

  useEffect(() => {
    findProjects();
  }, []);

  const projects = useSelector(({ projects }) => projects);
  const columns = [
    { field: "Title", width: 200 },
    { field: "Description", width: 500 },
  ];

  const rows = projects.map(({ id, title, description }) => {
    return {
      id,
      Title: title,
      Description: description,
    };
  });

  const navigateToProject = ({ rowModel }) => {
    const { id } = rowModel.data;
    history.push(`/projects/${id}`);
  };

  const classes = useStyles();
  return (
    <div className="main">
      <Link to="/add/projects" className="add-project-button">
        <Button variant="contained" color="primary">
          Add Project
        </Button>
      </Link>
      <div style={{ height: 800, width: "85%" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          onRowClick={navigateToProject}
        />
      </div>
    </div>
  );
};

export default Projects;

// css
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
