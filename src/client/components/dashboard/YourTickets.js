import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// components
import TicketCard from "./cards/TicketCard";

const YourTickets = () => {
  const userId = useSelector(({ user }) => user.id);
  const tickets = useSelector(({ tickets }) =>
    tickets.filter((ticket) => ticket.userId === userId)
  );
  return (
    <div className="main">
      <Link to="/home">Back</Link>
      <div>
        {tickets &&
          tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
      </div>
    </div>
  );
};

export default YourTickets;
