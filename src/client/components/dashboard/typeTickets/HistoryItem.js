import React from "react";
import moment from "moment";
import { capitalize } from "../../../utils/common";

// materialui
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";

const HistoryItem = ({ history }) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.nested}>
      <ListItemText primary={moment(history.createdAt).format("llll")} />
      <ListItemText primary={capitalize(history.priority)} />
      <ListItemText primary={capitalize(history.status)} />
      <ListItemText primary={capitalize(history.user.fullName)} />
    </ListItem>
  );
};

export default HistoryItem;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(12),
  },
}));
