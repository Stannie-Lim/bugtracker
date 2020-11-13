import React from "react";

// materialui
import Typography from "@material-ui/core/Typography";

const ProjectDetailUsersListHeader = ({ project }) => {
  return (
    <div>
      <Typography variant="h3" component="h4">
        Users assigned to {project.title}
      </Typography>
    </div>
  );
};

export default ProjectDetailUsersListHeader;
