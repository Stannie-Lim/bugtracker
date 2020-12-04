import React from "react";
import { useDispatch, useSelector } from "react-redux";

// store
import { assignTicket, unassignTicket, resolveTicket } from "../../store/store";

// materialui
import Button from "@material-ui/core/Button";
import { purple } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const TicketButtons = ({ ticket }) => {
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

  return ticket.status === "RESOLVED" ? (
    <Typography variant="h6">Ticket resolved</Typography>
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
    <Typography variant="h6">
      Ticket assigned to {ticketUser.fullName}
    </Typography>
  );
};

export default TicketButtons;

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);
