import React from "react";

// css
import "./projectCard.css";

const ProjectCard = ({ project, history }) => {
  const linkToProject = () => {
    history.push(`/projects/${project.id}`);
  };

  return (
    <tr onClick={linkToProject} className="project-card">
      <td>{project.title}</td>
      <td>{project.description}</td>
    </tr>
  );
};

export default ProjectCard;
