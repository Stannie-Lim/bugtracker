import React from "react";
import { useSelector, useDispatch } from "react-redux";

// store
import {
  assignTicket,
  unassignTicket,
  resolveTicket,
} from "../../../store/store";

// materialui
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const PriorityTicketCard = ({ ticket }) => {
  const ticketUser = ticket.user;
  const userId = useSelector(({ user }) => user.id);

  const dispatch = useDispatch();
  const assignYourself = () => {
    dispatch(assignTicket(userId, ticket.id));
  };

  const unassignYourself = () => {
    dispatch(unassignTicket(userId, ticket.id));
  };

  const resolve = () => {
    dispatch(resolveTicket(userId, ticket.id));
  };

  console.log(ticket);
  return (
    <div className="priority-ticket-card">
      <Typography variant="h4" gutterBottom>
        {ticket.project.title}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {ticket.info}
      </Typography>
      <Divider />
      <Typography variant="h6" gutterBottom>
        Status: {ticket.status}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Type: {ticket.type}
      </Typography>
      {ticket.status === "RESOLVED" ? (
        ""
      ) : !ticketUser ? (
        <button onClick={assignYourself}>Assign yourself to this ticket</button>
      ) : userId === ticketUser.id ? (
        <div>
          <button onClick={unassignYourself}>Unassign yourself</button>
          <button onClick={resolve}>Resolve ticket</button>
        </div>
      ) : (
        <h1>Ticket assigned to {ticketUser.fullName}</h1>
      )}
    </div>
  );
};

export default PriorityTicketCard;
