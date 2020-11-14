import React from "react";

// materialui
import Typography from "@material-ui/core/Typography";

const RightColumn = ({
  user,
  setEditNameVisibility,
  setEditEmailVisibility,
  setEditPasswordVisibility,
  editNameVisibility,
  editEmailVisibility,
  editPasswordVisibility,
}) => {
  return (
    <div className="column">
      {!editNameVisibility ? (
        <Typography
          variant="h6"
          className="right-column-text"
          gutterBottom
          onClick={() => setEditNameVisibility(!editNameVisibility)}
        >
          Edit
        </Typography>
      ) : (
        ""
      )}
      <Typography
        variant="h6"
        className="right-column-text"
        gutterBottom
        onClick={() => setEditEmailVisibility(!editEmailVisibility)}
      >
        Edit
      </Typography>
      <Typography
        variant="h6"
        className="right-column-text"
        gutterBottom
        onClick={() => setEditPasswordVisibility(!editPasswordVisibility)}
      >
        Edit
      </Typography>
    </div>
  );
};

export default RightColumn;
