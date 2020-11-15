import React from "react";
import { useSelector } from "react-redux";

// sort
import sortByPriority from "../sorts/sortByPriority";

// components
import Back from "../Back";
import TicketCard from "../cards/TicketCard";
import PriorityTicketCard from "./PriorityTicketCard";

// css
import "./TicketsByPriority.css";

// materialui
import Typography from "@material-ui/core/Typography";

const TicketsByPriority = () => {
  const tickets = useSelector(({ tickets }) => sortByPriority(tickets));
  return (
    <div className="main">
      <Back />
      <div className="columns">
        <div className="priority-column">
          <Typography variant="h2" gutterBottom>
            No Priority
          </Typography>
          {tickets &&
            tickets
              .filter((ticket) => ticket.priority === "NONE")
              .map((ticket) => (
                <PriorityTicketCard key={ticket.id} ticket={ticket} />
              ))}
        </div>
        <div className="priority-column">
          <Typography variant="h2" gutterBottom>
            Low Priority
          </Typography>
          {tickets &&
            tickets
              .filter((ticket) => ticket.priority === "LOW")
              .map((ticket) => (
                <PriorityTicketCard key={ticket.id} ticket={ticket} />
              ))}
        </div>
        <div className="priority-column">
          <Typography variant="h2" gutterBottom>
            Medium Priority
          </Typography>
          {tickets &&
            tickets
              .filter((ticket) => ticket.priority === "MEDIUM")
              .map((ticket) => (
                <PriorityTicketCard key={ticket.id} ticket={ticket} />
              ))}
        </div>
        <div className="priority-column">
          <Typography variant="h2" gutterBottom>
            High Priority
          </Typography>
          {tickets &&
            tickets
              .filter((ticket) => ticket.priority === "HIGH")
              .map((ticket) => (
                <PriorityTicketCard key={ticket.id} ticket={ticket} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default TicketsByPriority;
