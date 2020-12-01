import React from "react";
import { Link } from "react-router-dom";

// components
import TypeTickets from "./TypeTickets";

const TicketsByType = () => {
  return (
    <div className="main">
      <Link to="/home">Back</Link>
      <div>
        <TypeTickets />
        {/* {tickets &&
          tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))} */}
      </div>
    </div>
  );
};

export default TicketsByType;
