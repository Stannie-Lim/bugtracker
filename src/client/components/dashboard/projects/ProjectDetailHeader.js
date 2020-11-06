import React from "react";

const ProjectDetailHeader = ({ project }) => {
  return (
    <div>
      <h1>{project.title}</h1>
      <h3>{project.description}</h3>
    </div>
  );
};

export default ProjectDetailHeader;
