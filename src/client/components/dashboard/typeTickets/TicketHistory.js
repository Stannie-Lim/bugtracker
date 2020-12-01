import moment from "moment";
import React, { useState } from "react";
import { capitalize } from "../../../utils/common";

// components
import HistoryItem from "./HistoryItem";

// materialui
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const TicketHistory = ({ tickets, ticket }) => {
  const classes = useStyles();
  const [historyOpen, setHistoryOpen] = useState(false);
  const [ticketVisibilityOpen, setTicketVisibilityOpen] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false);

  const handleHistoryClick = () => {
    setHistoryOpen(!historyOpen);
  };

  const handleVisibilityOpen = () => {
    setTicketVisibilityOpen(!ticketVisibilityOpen);
  };

  const handleControlsOpen = () => {
    setControlsOpen(!controlsOpen);
  };

  return (
    <div>
      <ListItem
        button
        onClick={handleVisibilityOpen}
        className={classes.nested}
      >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={ticket.info} />
        {ticketVisibilityOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={ticketVisibilityOpen} timeout="auto" unmountOnExit>
        <ListItem
          button
          onClick={handleControlsOpen}
          className={classes.nested}
        >
          <ListItemText primary="Controls" />
          {ticketVisibilityOpen ? <ExpandLess /> : <ExpandMore />}

          <List component="div" disablePadding>
            <Collapse in={controlsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <h1>Controls</h1>
              </List>
            </Collapse>
          </List>
        </ListItem>

        <ListItem
          button
          onClick={handleHistoryClick}
          className={classes.nested}
        >
          <ListItemText primary="History" />
          {historyOpen ? <ExpandLess /> : <ExpandMore />}
          <Collapse in={historyOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {tickets &&
                tickets.map(({ tickethistories }) => {
                  return tickethistories.map((history) => (
                    <HistoryItem key={history.id} history={history} />
                  ));
                })}
            </List>
          </Collapse>
        </ListItem>
      </Collapse>
    </div>
  );
};

export default TicketHistory;

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
