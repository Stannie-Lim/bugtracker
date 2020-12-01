import React, { useState } from "react";

// icons
import ControlCameraIcon from "@material-ui/icons/ControlCamera";

// materialui
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const TicketControls = () => {
  const classes = useStyles();
  const [controlsOpen, setControlsOpen] = useState(false);

  const handleControlsOpen = () => {
    setControlsOpen(!controlsOpen);
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
            <ListItem className={classes.moreNested}>Controls</ListItem>
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
