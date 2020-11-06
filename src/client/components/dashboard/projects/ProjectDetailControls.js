import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// store
import { inviteUserToProject } from "../../../store/store";

const ProjectDetailControls = ({ projectId }) => {
  const [inviteUser, setInviteUser] = useState("");
  const [addUserVisibility, setAddUserVisibility] = useState(false);

  const dispatch = useDispatch();
  const sendUserInvite = (ev) => {
    ev.preventDefault();
    dispatch(inviteUserToProject(inviteUser, projectId));
  };

  return (
    <div>
      <Link to={`/projects/${projectId}/add-ticket`}>Create a new ticket</Link>

      <button onClick={() => setAddUserVisibility(!addUserVisibility)}>
        Invite another user to this project
      </button>

      <form
        className={addUserVisibility ? "" : "hide"}
        onSubmit={sendUserInvite}
      >
        <input
          type="text"
          onChange={({ target }) => setInviteUser(target.value)}
          value={inviteUser}
        />
        <button>Invite user</button>
      </form>
    </div>
  );
};

export default ProjectDetailControls;
