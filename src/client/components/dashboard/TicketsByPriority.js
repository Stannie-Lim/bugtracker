import React from "react";
import { useSelector } from "react-redux";

// sort
import sortByPriority from "./sorts/sortByPriority";

// components
import Back from "./Back";
import TicketCard from "./cards/TicketCard";

// css
import "./TicketsByPriority.css";

const TicketsByPriority = () => {
  const tickets = useSelector(({ tickets }) => sortByPriority(tickets));
  return (
    <div className="main">
      <Back />
      <div className="columns">
        <div>
          <h1>No Priority</h1>
          {tickets &&
            tickets
              .filter((ticket) => ticket.priority === "NONE")
              .map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)}
        </div>
        <div>
          <h1>Low Priority</h1>
          {tickets &&
            tickets
              .filter((ticket) => ticket.priority === "LOW")
              .map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)}
        </div>
        <div>
          <h1>Medium Priority</h1>
          {tickets &&
            tickets
              .filter((ticket) => ticket.priority === "MEDIUM")
              .map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)}
        </div>
        <div>
          <h1>High Priority</h1>
          {tickets &&
            tickets
              .filter((ticket) => ticket.priority === "HIGH")
              .map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)}
        </div>
      </div>
    </div>
  );
};

export default TicketsByPriority;
