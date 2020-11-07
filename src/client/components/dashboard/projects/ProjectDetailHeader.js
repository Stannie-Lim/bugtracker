import React from "react";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

// css
import "./ProjectDetailHeader.css";

const ProjectDetailHeader = ({ project }) => {
  return (
    <div className="project-detail-header">
      <Typography variant="h1" component="h2">
        {project.title}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {project.description}
      </Typography>
      <Divider />
    </div>
  );
};

export default ProjectDetailHeader;
