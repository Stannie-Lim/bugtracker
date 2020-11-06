import React from "react";

// components
import TicketCard from "../cards/TicketCard";

const ProjectsTicketsList = ({ tickets }) => {
  return (
    tickets &&
    tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
  );
};

export default ProjectsTicketsList;
