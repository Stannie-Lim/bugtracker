import React from "react";
import { useSelector, useDispatch } from "react-redux";

// store
import {
  assignTicket,
  unassignTicket,
  resolveTicket,
} from "../../../store/store";

const TicketCard = ({ ticket }) => {
  const ticketUser = ticket.user;
  console.log(ticket);
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

  return (
    <div className="ticket">
      <h3>type {ticket.type}</h3>
      <h3>status {ticket.status}</h3>
      <h3>priority {ticket.priority}</h3>
      <h3>info {ticket.info}</h3>
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

export default TicketCard;
