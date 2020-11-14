import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// components
import EditProfile from "./EditProfile";

// materialui
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Profile = () => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const user = useSelector(({ user }) => user);
  const error = useSelector(({ error }) => error);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  return (
    <div className="main">
      <h1>Profile</h1>
      {/* <img src={user.imageUrl} /> */}
      <EditProfile user={user} />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Incorrect Password
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
