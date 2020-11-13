import React from "react";

// components
import UsersList from "./UsersList";
import ProjectDetailUsersListHeader from "./ProjectDetailUsersListHeader";

// css
import "./ProjectDetailUsersList.css";

// materialui
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const ProjectDetailUsersList = ({ project }) => {
  const classes = useStyles();

  return (
    <div className="users-assigned">
      <ProjectDetailUsersListHeader project={project} />
      <UsersList project={project} />
    </div>
  );
};

export default ProjectDetailUsersList;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
