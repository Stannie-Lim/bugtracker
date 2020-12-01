import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { capitalize } from "../../../utils/common";

// components
import Tickets from "./Tickets";

// materialui
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

const TypeTickets = () => {
  const tickets = useSelector(({ tickets }) => {
    const categorized = {
      BUG: [],
      ERROR: [],
      FEATURE_REQUEST: [],
      "TO-DO": [],
    };

    for (const ticket of tickets) {
      categorized[ticket.type].push(ticket);
    }

    return categorized;
  });

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Tickets By Type
        </ListSubheader>
      }
    >
      {Object.keys(tickets).map((type) => (
        <Tickets tickets={tickets[type]} type={capitalize(type)} key={type} />
      ))}
    </List>
  );
};

export default TypeTickets;
