import React from "react";

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket">
      <h1>{ticket.priority}</h1>
      <h1>{ticket.info}</h1>
    </div>
  );
};

export default TicketCard;
