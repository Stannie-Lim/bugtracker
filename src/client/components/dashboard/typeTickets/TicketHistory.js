import React, { useState } from "react";

// components
import HistoryItem from "./HistoryItem";

// materialui
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemText from "@material-ui/core/ListItemText";

const TicketHistory = ({ tickets }) => {
  const classes = useStyles();
  const [historyOpen, setHistoryOpen] = useState(false);

  const handleHistoryClick = () => {
    setHistoryOpen(!historyOpen);
  };
  return (
    <div>
      <ListItem button onClick={handleHistoryClick} className={classes.nested}>
        <ListItemText primary="History" />
        {historyOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
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
