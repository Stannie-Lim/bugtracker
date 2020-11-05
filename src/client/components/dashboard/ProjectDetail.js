import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// css
import "./projectDetail.css";

// components
import TicketCard from "./cards/TicketCard";

// sorts
import sortByPriority from "./sorts/sortByPriority";

// store
import { inviteUserToProject } from "../../store/store";

const ProjectDetail = ({ match }) => {
  const [inviteUser, setInviteUser] = useState("");
  const [addUserVisibility, setAddUserVisibility] = useState(false);

  const projectId = match.params.projectId;
  const project = useSelector(({ projects }) =>
    projects.find((project) => project.id === projectId)
  );
  const tickets = useSelector(({ tickets }) =>
    sortByPriority(tickets.filter((ticket) => ticket.projectId === projectId))
  );

  const dispatch = useDispatch();
  const sendUserInvite = (ev) => {
    ev.preventDefault();
    dispatch(inviteUserToProject(inviteUser, projectId));
  };

  return (
    <div className="main">
      <h1>{project.title}</h1>
      <h3>{project.description}</h3>

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

      {tickets &&
        tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)}
    </div>
  );
};

export default ProjectDetail;
