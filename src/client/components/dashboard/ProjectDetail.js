import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ProjectDetail = ({ match }) => {
  const projectId = match.params.projectId;
  const project = useSelector(({ projects }) =>
    projects.find((project) => project.id === projectId)
  );
  const tickets = useSelector(({ tickets }) =>
    tickets.filter((ticket) => ticket.projectId === projectId)
  );

  console.log(tickets);
  return (
    <div className="main">
      <h1>{project.title}</h1>
      <h3>{project.description}</h3>
    </div>
  );
};

export default ProjectDetail;
