import React from "react";

// materialui
import Typography from "@material-ui/core/Typography";

const MiddleColumn = ({ user }) => {
  return (
    <div className="column">
      <Typography variant="h6" gutterBottom>
        {user.fullName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {user.email}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {user.email}
      </Typography>
    </div>
  );
};

export default MiddleColumn;
