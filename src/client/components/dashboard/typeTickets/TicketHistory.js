import React, { useState } from "react";

// components
import HistoryItem from "./HistoryItem";

// icons
import HistoryIcon from "@material-ui/icons/History";

// materialui
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const TicketHistory = ({ ticket }) => {
  const classes = useStyles();
  const [historyOpen, setHistoryOpen] = useState(false);

  const handleHistoryClick = () => {
    setHistoryOpen(!historyOpen);
  };
  return (
    <div>
      <ListItem button onClick={handleHistoryClick} className={classes.nested}>
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary="History" />
        {historyOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={historyOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {ticket &&
            ticket.tickethistories.map((history) => {
              return <HistoryItem key={history.id} history={history} />;
            })}
        </List>
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
    paddingLeft: theme.spacing(8),
  },
}));
