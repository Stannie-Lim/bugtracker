import React, { useState } from "react";
import { useSelector } from "react-redux";
import sortByStatus from "../sorts/sortByStatus";

// sort
import sortByPriority from "../sorts/sortByPriority";

// components
import Back from "../Back";
import AddTicketCard from "./AddTicketCard";
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
          <div className="priority-column-title">
            <Typography variant="h4" gutterBottom>
              No Priority
            </Typography>
          </div>
          <div className="priority-column-tickets">
            {tickets &&
              sortByStatus(tickets)
                .filter((ticket) => ticket.priority === "NONE")
                .map((ticket) => (
                  <PriorityTicketCard key={ticket.id} ticket={ticket} />
                ))}
            <AddTicketCard priority="no" />
          </div>
        </div>

        <div className="priority-column">
          <div className="priority-column-title">
            <Typography variant="h4" gutterBottom>
              Low Priority
            </Typography>
          </div>
          <div className="priority-column-tickets">
            {tickets &&
              sortByStatus(tickets)
                .filter((ticket) => ticket.priority === "LOW")
                .map((ticket) => (
                  <PriorityTicketCard key={ticket.id} ticket={ticket} />
                ))}
            <AddTicketCard priority="low" />
          </div>
        </div>

        <div className="priority-column">
          <div className="priority-column-title">
            <Typography variant="h4" gutterBottom>
              Medium Priority
            </Typography>
          </div>
          <div className="priority-column-tickets">
            {tickets &&
              sortByStatus(tickets)
                .filter((ticket) => ticket.priority === "MEDIUM")
                .map((ticket) => (
                  <PriorityTicketCard key={ticket.id} ticket={ticket} />
                ))}
            <AddTicketCard priority="medium" />
          </div>
        </div>

        <div className="priority-column">
          <div className="priority-column-title">
            <Typography variant="h4" gutterBottom>
              High Priority
            </Typography>
          </div>
          <div className="priority-column-tickets">
            {tickets &&
              sortByStatus(tickets)
                .filter((ticket) => ticket.priority === "HIGH")
                .map((ticket) => (
                  <PriorityTicketCard key={ticket.id} ticket={ticket} />
                ))}
            <AddTicketCard priority="high" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsByPriority;
