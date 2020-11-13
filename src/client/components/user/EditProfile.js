import React from "react";
import { Link } from "react-router-dom";

// components
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn.js";
import MiddleColumn from "./MiddleColumn";

// materialui
import TextField from "@material-ui/core/TextField";

// css
import "./EditProfile.css";

const EditProfile = ({ user }) => {
  return (
    <div className="edit-profile">
      <LeftColumn user={user} />
      <MiddleColumn user={user} />
      <RightColumn user={user} />
      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
    </div>
  );
};

export default EditProfile;
