import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// store
import { getProjects } from "../../../store/store";

// components
import ProjectCard from "../cards/ProjectCard";

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
    { field: "Description", width: 600 },
    { field: "Users", width: 100 },
    { field: "Active tickets", width: 155 },
  ];

  const rows = projects.map(({ id, title, description, users, tickets }) => {
    if (tickets.length)
      tickets = tickets.filter((ticket) => ticket.status !== "RESOLVED");

    return {
      id,
      Title: title,
      Description: description,
      Users: users.length,
      "Active tickets": tickets.length,
    };
  });

  const navigateToProject = ({ rowModel }) => {
    const { id } = rowModel.data;
    history.push(`/projects/${id}`);
  };

  const classes = useStyles();
  return (
    <div className="table">
      <Link to="/add/projects" className="add-project-button">
        <Button variant="contained" classes={{ root: classes.button }}>
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
  button: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
}));
