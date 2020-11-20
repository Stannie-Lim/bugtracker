import React from "react";
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
import Typography from "@material-ui/core/Typography";
import { green, purple } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

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
      <Typography variant="h5" gutterBottom>
        {ticket.info}
      </Typography>
      <Divider />
      <Typography variant="h6" gutterBottom>
        Status: {ticket.status}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Type: {ticket.type}
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
            <ThemeProvider theme={theme}>
              <Button variant="contained" color="primary" onClick={resolve}>
                Resolve ticket
              </Button>
            </ThemeProvider>
          </div>
        </div>
      ) : (
        <h1>Ticket assigned to {ticketUser.fullName}</h1>
      )}
    </div>
  );
};

export default PriorityTicketCard;

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});
