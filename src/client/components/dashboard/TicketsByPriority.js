import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// sort
import sortByPriority from "./sorts/sortByPriority";

// components
import TicketCard from "./cards/TicketCard";

const TicketsByPriority = () => {
  const tickets = useSelector(({ tickets }) => sortByPriority(tickets));
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

export default TicketsByPriority;
