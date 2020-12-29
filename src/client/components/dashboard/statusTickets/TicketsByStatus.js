import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { capitalize } from "../../../utils/common";

// css
import "./ticketsByStatus.css";

// components
import StatusTickets from "./StatusTickets";

// materialui
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const TicketsByType = () => {
  const classes = useStyles();

  const tickets = useSelector(({ tickets }) => {
    const categorized = {
      OPEN: [],
      IN_PROGRESS: [],
      RESOLVED: [],
    };

    for (const ticket of tickets) {
      categorized[ticket.status].push(ticket);
    }

    return categorized;
  });

  return (
    <div className="main">
      <Link to="/home">Back</Link>

      <div className="ticket-labels">
        {Object.keys(tickets).map((category) => {
          const color =
            category === "OPEN"
              ? "green"
              : category === "IN_PROGRESS"
              ? "red"
              : "blue";

          return (
            <div key={category}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <div key={category} className="status-type">
                    <Typography variant="h6" style={{ color }}>
                      {capitalize(category)}
                    </Typography>
                    <div className="ticket-list">
                      {tickets[category].map((ticket) => (
                        <StatusTickets key={ticket.id} ticket={ticket} />
                      ))}
                    </div>
                  </div>
                </Grid>
              </Paper>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicketsByType;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
