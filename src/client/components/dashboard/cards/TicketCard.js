import React from "react";
import { useSelector, useDispatch } from "react-redux";

// store
import { assignTicket, unassignTicket } from "../../../store/store";

const TicketCard = ({ ticket }) => {
  const ticketUser = ticket.user;
  const userId = useSelector(({ user }) => user.id);
  console.log(ticket.user);

  const dispatch = useDispatch();
  const assignYourself = () => {
    dispatch(assignTicket(userId, ticket.id));
  };

  const unassignYourself = () => {
    dispatch(unassignTicket(userId, ticket.id));
  };

  return (
    <div className="ticket">
      <h3>type {ticket.type}</h3>
      <h3>status {ticket.status}</h3>
      <h3>priority {ticket.priority}</h3>
      <h3>info {ticket.info}</h3>
      {!ticketUser ? (
        <button onClick={assignYourself}>Assign yourself to this ticket</button>
      ) : userId === ticketUser.id ? (
        <button onClick={unassignYourself}>Unassign yourself</button>
      ) : (
        <h1>Ticket assigned to {ticketUser.fullName}</h1>
      )}
    </div>
  );
};

export default TicketCard;
