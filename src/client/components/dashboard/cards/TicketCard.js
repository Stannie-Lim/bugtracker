import React from "react";

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket">
      <h3>type {ticket.type}</h3>
      <h3>status {ticket.status}</h3>
      <h3>priority {ticket.priority}</h3>
      <h3>info {ticket.info}</h3>
    </div>
  );
};

export default TicketCard;
