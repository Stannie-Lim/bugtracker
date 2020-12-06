import React, { useState } from "react";

// css
import "./tickets.css";

// components
import TicketVisibility from "./TicketVisbility";

// icons
import HelpIcon from "@material-ui/icons/Help";
import ListAltIcon from "@material-ui/icons/ListAlt";
import BugReportIcon from "@material-ui/icons/BugReport";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

// materialui
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const Tickets = ({ tickets, type }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const icon =
    type === "Bug" ? (
      <BugReportIcon />
    ) : type === "Error" ? (
      <ErrorOutlineIcon />
    ) : type === "Feature request" ? (
      <HelpIcon />
    ) : (
      <ListAltIcon />
    );

  const color =
    type === "Bug"
      ? "red"
      : type === "Error"
      ? "pink"
      : type === "Feature request"
      ? "cyan"
      : "lightgreen";

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={type} className={`ticket-${color}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {tickets &&
            tickets.map((ticket) => (
              <TicketVisibility
                ticket={ticket}
                tickets={tickets}
                key={ticket.id}
              />
            ))}
        </List>
      </Collapse>
    </div>
  );
};

export default Tickets;
