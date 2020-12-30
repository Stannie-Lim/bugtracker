import React, { useState } from "react";

// components
import StatusTicketsModal from "./StatusTicketsModal";

// materialui
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const StatusTickets = ({ ticket }) => {
  const classes = useStyles();
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <div className="single-status-ticket">
      <div onClick={showModal} className="ticket-click">
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
              <div>
                <Typography>{ticket.project.title}</Typography>
                <Typography>{ticket.info}</Typography>
              </div>
              {/* <TicketButtons ticket={ticket} /> */}
            </Grid>
          </Grid>
        </Paper>
      </div>
      <StatusTicketsModal
        modalVisible={modalVisible}
        showModal={showModal}
        ticket={ticket}
      />
    </div>
  );
};

export default StatusTickets;

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
