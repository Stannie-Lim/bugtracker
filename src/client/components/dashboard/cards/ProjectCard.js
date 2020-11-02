import React from "react";

// css
import "./projectCard.css";

const ProjectCard = ({ project }) => {
  return (
    <tr>
      <td>{project.title}</td>
      <td>{project.description}</td>
    </tr>
  );
};

export default ProjectCard;
