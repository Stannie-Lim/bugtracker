import clsx from "clsx";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeJWT } from "../../utils/axios";

// store
import { signout } from "../../store/store";

// components
import SearchBar from "./SearchBar";
import TopHeader from "./TopHeader";
import MobileBar from "./MobileBar";
import TopRightBar from "./TopRightBar";

// materialui
import Menu from "@material-ui/core/Menu";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import MoreIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;
const TopNav = ({ open, setOpen }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isNotificationOpen = Boolean(notificationAnchor);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const dispatch = useDispatch();

  const openAccountMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openNotificationMenu = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const openMobileMenu = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const closeAccountMenu = () => {
    setAnchorEl(null);
  };

  const closeNotificationMenu = () => {
    setNotificationAnchor(null);
  };

  const closeMobileMenu = () => {
    setMobileMoreAnchorEl(null);
  };

  const goToProfile = () => {
    console.log("profile");
    closeAccountMenu();
    closeMobileMenu();
  };

  const goToAccount = () => {
    console.log("account");
    closeAccountMenu();
    closeMobileMenu();
  };

  const logout = () => {
    removeJWT();
    dispatch(signout());

    closeAccountMenu();
    closeMobileMenu();
  };

  const goToNotifications = () => {
    console.log("notifications");
    closeNotificationMenu();
    closeMobileMenu();
  };

  const declineInvite = (id) => {};

  const acceptInvite = (id) => {};

  const userInvites = useSelector(({ user }) => user.invitee);
  const userId = useSelector(({ user }) => user.id);

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={closeMobileMenu}
    >
      <MenuItem onClick={goToNotifications}>
        <IconButton aria-label="show new notifications" color="inherit">
          <Badge badgeContent={userInvites.length} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={goToAccount}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={closeAccountMenu}
    >
      <MenuItem onClick={goToProfile}>Profile</MenuItem>
      <MenuItem onClick={goToAccount}>My account</MenuItem>
      <MenuItem onClick={logout}>Log out</MenuItem>
    </Menu>
  );

  const notificationMenu = (
    <Menu
      anchorEl={notificationAnchor}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isNotificationOpen}
      onClose={closeNotificationMenu}
    >
      {userInvites.map(({ inviter, project, id }) => {
        return (
          <MenuItem key={id} className="notification-item">
            <div>
              {inviter.fullName} invites you to {project.title}
            </div>
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => declineInvite(id)}
              >
                Decline
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => acceptInvite(id)}
              >
                Accept
              </Button>
            </div>
          </MenuItem>
        );
      })}
    </Menu>
  );

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(true)}
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>

        <TopHeader />
        <SearchBar />
        <div className={classes.grow} />
        <TopRightBar
          openNotificationMenu={openNotificationMenu}
          openAccountMenu={openAccountMenu}
          notificationCount={userInvites.length}
        />
        <MobileBar openMobileMenu={openMobileMenu} />
      </Toolbar>
      {renderMobileMenu}
      {renderMenu}
      {notificationMenu}
    </AppBar>
  );
};

export default TopNav;

// css
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    color: "white",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: "linear-gradient(120deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    background: "linear-gradient(120deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
