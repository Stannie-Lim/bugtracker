import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { capitalize } from "../../../utils/common";

// components
import TicketButtons from "../TicketButtons";

// bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// materialui
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

const StatusTicketsModal = ({ modalVisible, showModal, ticket }) => {
  const classes = useStyles();

  return (
    <Modal show={modalVisible} onHide={showModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <Typography>{ticket.project.title}</Typography>
          <Typography>{ticket.info}</Typography>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TicketButtons ticket={ticket} />
        <div>
          <List className={classes.root}>
            {ticket.tickethistories.map((history) => {
              return (
                <ListItem>
                  <ListItemText
                    primary={moment(history.createdAt).format("llll")}
                    secondary={capitalize(history.priority)}
                  />
                  <ListItemText
                    primary={capitalize(history.status)}
                    secondary={history.user.fullName}
                  />
                </ListItem>
              );
            })}
          </List>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={showModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StatusTicketsModal;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
