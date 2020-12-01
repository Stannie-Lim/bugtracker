import React from "react";
import { capitalize } from "../../../utils/common";
import { useSelector, useDispatch } from "react-redux";

// store
import {
  assignTicket,
  unassignTicket,
  resolveTicket,
} from "../../../store/store";

// materialui
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { purple } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const PriorityTicketCard = ({ ticket }) => {
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
    <div className="priority-ticket-card">
      <Typography variant="h4" gutterBottom>
        {ticket.project.title}
      </Typography>
      <Divider />
      <Typography variant="h5" gutterBottom>
        Information: {ticket.info}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Status: {capitalize(ticket.status)}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Type: {capitalize(ticket.type)}
      </Typography>
      {ticket.status === "RESOLVED" ? (
        ""
      ) : !ticketUser ? (
        <Button variant="contained" color="primary" onClick={assignYourself}>
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
            <ColorButton variant="contained" color="primary" onClick={resolve}>
              Resolve ticket
            </ColorButton>
          </div>
        </div>
      ) : (
        <h1>Ticket assigned to {ticketUser.fullName}</h1>
      )}
    </div>
  );
};

export default PriorityTicketCard;

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);
