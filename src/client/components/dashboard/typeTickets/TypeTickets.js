import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ResponsiveNetwork } from "@nivo/network";
import React, { useState, useEffect } from "react";
import { capitalize } from "../../../utils/common";

// components
import BugTickets from "./BugTickets";
import TodoTickets from "./TodoTickets";
import ErrorTickets from "./ErrorTickets";
import FeatureRequestTickets from "./FeatureRequestTickets";

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
      <BugTickets tickets={tickets.BUG} />
      <TodoTickets tickets={tickets["TO-DO"]} />
      <ErrorTickets tickets={tickets.ERROR} />
      <FeatureRequestTickets tickets={tickets.FEATURE_REQUEST} />
    </List>
  );
};

export default TypeTickets;
