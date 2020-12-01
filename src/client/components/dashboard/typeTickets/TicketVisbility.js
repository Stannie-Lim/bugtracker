import React, { useState } from "react";

// components
import TicketHistory from "./TicketHistory";
import TicketControls from "./TicketControls";

// icons
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";

// materialui
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const TicketVisibility = ({ tickets, ticket }) => {
  const classes = useStyles();

  const [ticketVisibilityOpen, setTicketVisibilityOpen] = useState(false);

  const handleVisibilityOpen = () => {
    setTicketVisibilityOpen(!ticketVisibilityOpen);
  };

  return (
    <div>
      <ListItem
        button
        onClick={handleVisibilityOpen}
        className={classes.nested}
      >
        <ListItemIcon>
          <ConfirmationNumberIcon />
        </ListItemIcon>

        <ListItemText primary={ticket.info} />
        <ListItemText secondary={ticket.project.title} />

        {ticketVisibilityOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={ticketVisibilityOpen} timeout="auto" unmountOnExit>
        <TicketControls />
        <TicketHistory tickets={tickets} />
      </Collapse>
    </div>
  );
};

export default TicketVisibility;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
