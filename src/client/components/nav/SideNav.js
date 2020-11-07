import clsx from "clsx";
import { Link } from "react-router-dom";
import React, { useState } from "react";

// materialui
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import HomeIcon from "@material-ui/icons/Home";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useTheme } from "@material-ui/core/styles";

// css
import { useStyles } from "./NavCSS";

const SideNav = ({ open, setOpen }) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton color="inherit" onClick={() => setOpen(false)}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      {/* <Divider /> */}
      <List>
        {["Home", "Projects"].map((text, index) => (
          <Link to={`/${text.toLowerCase()}`} key={text} className="side-bar">
            <ListItem button>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <HomeIcon style={{ color: "white" }} />
                ) : (
                  <AccountTreeIcon style={{ color: "white" }} />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? (
                <HomeIcon style={{ color: "white" }} />
              ) : (
                <AccountTreeIcon style={{ color: "white" }} />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNav;
