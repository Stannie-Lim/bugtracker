import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// store
import {
  assignTicket,
  unassignTicket,
  resolveTicket,
} from "../../../store/store";

// icons
import ControlCameraIcon from "@material-ui/icons/ControlCamera";

// materialui
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import { purple } from "@material-ui/core/colors";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const TicketControls = ({ ticket }) => {
  const classes = useStyles();
  const [controlsOpen, setControlsOpen] = useState(false);

  const handleControlsOpen = () => {
    setControlsOpen(!controlsOpen);
  };

  const ticketUser = ticket.user;
  const userId = useSelector(({ user }) => user.id);

  const dispatch = useDispatch();
  const assignYourself = () => {
    dispatch(assignTicket(userId, ticket.id));
  };

  const unassignYourself = () => {
    dispatch(unassignTicket(userId, ticket.id));
  };

  const resolve = () => {
    dispatch(resolveTicket(userId, ticket.id));
  };

  return (
    <div>
      <ListItem button onClick={handleControlsOpen} className={classes.nested}>
        <ListItemIcon>
          <ControlCameraIcon />
        </ListItemIcon>
        <ListItemText primary="Controls" />
        {controlsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <List component="div" disablePadding>
        <Collapse in={controlsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className={classes.moreNested}>
              {ticket.status === "RESOLVED" ? (
                ""
              ) : !ticketUser ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={assignYourself}
                >
                  Assign yourself to this ticket
                </Button>
              ) : userId === ticketUser.id ? (
                <div>
                  <div className="user-ticket-button">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={unassignYourself}
                    >
                      Unassign yourself
                    </Button>
                  </div>
                  <div className="user-ticket-button">
                    <ColorButton
                      variant="contained"
                      color="primary"
                      onClick={resolve}
                    >
                      Resolve ticket
                    </ColorButton>
                  </div>
                </div>
              ) : (
                <h1>Ticket assigned to {ticketUser.fullName}</h1>
              )}
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default TicketControls;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(8),
  },
  moreNested: {
    paddingLeft: theme.spacing(12),
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);
