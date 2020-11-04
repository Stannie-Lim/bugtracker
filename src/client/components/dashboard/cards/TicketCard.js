import React from "react";

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket">
      <h1>{ticket.type}</h1>
      <h3>{ticket.status}</h3>
      <h3>{ticket.priority}</h3>
      <h3>{ticket.info}</h3>
    </div>
  );
};

export default TicketCard;
