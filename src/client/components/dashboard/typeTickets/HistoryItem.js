import React from "react";
import moment from "moment";
import { capitalize } from "../../../utils/common";

// materialui
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const HistoryItem = ({ history, ticket }) => {
  const classes = useStyles();
  return (
    <ListItem button className={classes.nested}>
      <ListItemIcon>
        <StarBorder />
      </ListItemIcon>
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
    paddingLeft: theme.spacing(8),
  },
}));
