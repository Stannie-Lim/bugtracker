import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// sort
import sortByType from "./sorts/sortByType";

// components
import TicketCard from "./cards/TicketCard";

const TicketsByType = () => {
  const tickets = useSelector(({ tickets }) => sortByType(tickets));
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
