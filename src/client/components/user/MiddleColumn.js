import React, { useState } from "react";

// components
import EditNameModal from "./modals/EditNameModal";
import EditEmailModal from "./modals/EditEmailModal";
import EditPasswordModal from "./modals/EditPasswordModal";

// materialui
import Typography from "@material-ui/core/Typography";

const MiddleColumn = ({
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
      <Typography variant="h6" className="middle-column-text" gutterBottom>
        {user.fullName}
      </Typography>
      <Typography variant="h6" className="middle-column-text" gutterBottom>
        {user.email}
      </Typography>
      <Typography variant="h6" className="middle-column-text" gutterBottom>
        ********
      </Typography>

      <EditNameModal
        user={user}
        editNameVisibility={editNameVisibility}
        setEditNameVisibility={setEditNameVisibility}
      />
      <EditEmailModal
        user={user}
        editEmailVisibility={editEmailVisibility}
        setEditEmailVisibility={setEditEmailVisibility}
      />
      <EditPasswordModal
        user={user}
        editPasswordVisibility={editPasswordVisibility}
        setEditPasswordVisibility={setEditPasswordVisibility}
      />
    </div>
  );
};

export default MiddleColumn;

// <form>
//   <TextField id="outlined-basic" label="Outlined" variant="outlined" value={ firstName } onChange={ ({ target }) => setFirstName(target.value) } />
//   <TextField id="outlined-basic" label="Outlined" variant="outlined" value={ lastName } onChange={ ({ target }) => setLastName(target.value) } />
// </form>
