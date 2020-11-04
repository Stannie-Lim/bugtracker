import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

// css
import "./projectDetail.css";

const ProjectDetail = ({ match }) => {
  const projectId = match.params.projectId;
  const project = useSelector(({ projects }) =>
    projects.find((project) => project.id === projectId)
  );
  const tickets = useSelector(({ tickets }) =>
    tickets
      .filter((ticket) => ticket.projectId === projectId)
      .map((ticket) => {
        switch (ticket.priority) {
          case "NONE":
            return { ...ticket, priority: 0 };
          case "LOW":
            return { ...ticket, priority: 1 };
          case "MEDIUM":
            return { ...ticket, priority: 2 };
          case "HIGH":
            return { ...ticket, priority: 3 };
        }
      })
      .sort((a, b) => a.priority - b.priority)
      .map((ticket) => {
        switch (ticket.priority) {
          case 0:
            return { ...ticket, priority: "NONE" };
          case 1:
            return { ...ticket, priority: "LOW" };
          case 2:
            return { ...ticket, priority: "MEDIUM" };
          case 3:
            return { ...ticket, priority: "HIGH" };
        }
      })
  );

  return (
    <div className="main">
      <h1>{project.title}</h1>
      <h3>{project.description}</h3>

      <Link to={`/projects/${projectId}/add-ticket`}>Create a new ticket</Link>
      {tickets &&
        tickets.map((ticket) => (
          <div className="ticket" key={ticket.id}>
            <h1>{ticket.priority}</h1>
            <h1>{ticket.info}</h1>
          </div>
        ))}
    </div>
  );
};

export default ProjectDetail;
