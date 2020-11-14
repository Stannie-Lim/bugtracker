import React, { useState } from "react";
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
  const [editNameVisibility, setEditNameVisibility] = useState(false);
  const [editEmailVisibility, setEditEmailVisibility] = useState(false);
  const [editPasswordVisibility, setEditPasswordVisibility] = useState(false);

  return (
    <div className="edit-profile">
      <LeftColumn user={user} />
      <MiddleColumn
        user={user}
        setEditNameVisibility={setEditNameVisibility}
        setEditEmailVisibility={setEditEmailVisibility}
        setEditPasswordVisibility={setEditPasswordVisibility}
        editNameVisibility={editNameVisibility}
        editEmailVisibility={editEmailVisibility}
        editPasswordVisibility={editPasswordVisibility}
      />
      <RightColumn
        user={user}
        setEditNameVisibility={setEditNameVisibility}
        setEditEmailVisibility={setEditEmailVisibility}
        setEditPasswordVisibility={setEditPasswordVisibility}
        editNameVisibility={editNameVisibility}
        editEmailVisibility={editEmailVisibility}
        editPasswordVisibility={editPasswordVisibility}
      />
      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
    </div>
  );
};

export default EditProfile;
