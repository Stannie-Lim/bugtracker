import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// css
import "./projectDetail.css";

// components
import ProjectDetailHeader from "./ProjectDetailHeader";
import ProjectDetailControls from "./ProjectDetailControls";
import ProjectDetailUsersList from "./ProjectDetailUsersList";
import ProjectDetailTicketsList from "./ProjectDetailTicketsList";

// sorts
import sortByPriority from "../sorts/sortByPriority";

const ProjectDetail = ({ match }) => {
  const projectId = match.params.projectId;
  const project = useSelector(({ projects }) =>
    projects.find((project) => project.id === projectId)
  );

  const tickets = useSelector(({ tickets }) =>
    sortByPriority(tickets.filter((ticket) => ticket.projectId === projectId))
  );

  console.log(tickets);

  return (
    <div className="main">
      <ProjectDetailHeader project={project} />
      <ProjectDetailControls projectId={projectId} />
      <ProjectDetailTicketsList tickets={tickets} />
      <ProjectDetailUsersList project={project} />
    </div>
  );
};

export default ProjectDetail;
