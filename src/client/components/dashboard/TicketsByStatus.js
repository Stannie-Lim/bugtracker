import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// sort
import sortByStatus from "./sorts/sortByStatus";

// components
import TicketCard from "./cards/TicketCard";

const TicketsByType = () => {
  const tickets = useSelector(({ tickets }) => sortByStatus(tickets));
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

export default TicketsByType;
