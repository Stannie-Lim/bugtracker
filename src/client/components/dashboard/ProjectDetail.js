import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

// css
import "./projectDetail.css";

// components
import TicketCard from "./cards/TicketCard";

// sorts
import sortByPriority from "./sorts/sortByPriority";

const ProjectDetail = ({ match }) => {
  const projectId = match.params.projectId;
  const project = useSelector(({ projects }) =>
    projects.find((project) => project.id === projectId)
  );
  const tickets = useSelector(({ tickets }) =>
    sortByPriority(tickets.filter((ticket) => ticket.projectId === projectId))
  );

  return (
    <div className="main">
      <h1>{project.title}</h1>
      <h3>{project.description}</h3>

      <Link to={`/projects/${projectId}/add-ticket`}>Create a new ticket</Link>
      {tickets &&
        tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)}
    </div>
  );
};

export default ProjectDetail;
