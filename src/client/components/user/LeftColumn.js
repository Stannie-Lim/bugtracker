import React from "react";

// materialui
import Typography from "@material-ui/core/Typography";

const LeftColumn = ({ user }) => {
  return (
    <div className="column">
      <Typography variant="h6" gutterBottom>
        Name
      </Typography>
      <Typography variant="h6" gutterBottom>
        Email
      </Typography>
      <Typography variant="h6" gutterBottom>
        Password
      </Typography>
    </div>
  );
};

export default LeftColumn;
