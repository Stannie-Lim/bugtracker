import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// store
import { inviteUserToProject } from "../../../store/store";

// css
import "./ProjectDetailControls.css";

// materialui
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const ProjectDetailControls = ({ projectId }) => {
  const [open, setOpen] = useState(false);
  const [inviteUser, setInviteUser] = useState("");
  const [addUserVisibility, setAddUserVisibility] = useState(false);
  const classes = useStyles();

  const userId = useSelector(({ user }) => user.id);
  const error = useSelector(({ error }) => error);

  const dispatch = useDispatch();
  const sendUserInvite = (ev) => {
    ev.preventDefault();
    dispatch(inviteUserToProject(inviteUser, projectId, userId));
    setInviteUser("");
  };

  useEffect(() => {
    if (error.length) {
      setOpen(true);
    }
  }, [error.length]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="controls-div">
      <div className="controls">
        <Link
          to={`/projects/${projectId}/add-ticket`}
          className="add-ticket-button"
        >
          <Button variant="contained" classes={{ root: classes.button }}>
            Create a new ticket
          </Button>
        </Link>

        <div className="add-another-user">
          <Button
            variant="contained"
            onClick={() => setAddUserVisibility(!addUserVisibility)}
            classes={{ root: classes.button }}
            className="add-ticket-button"
          >
            Invite another user
          </Button>
          <form
            className={addUserVisibility ? "" : "hide"}
            onSubmit={sendUserInvite}
          >
            <input
              type="text"
              onChange={({ target }) => setInviteUser(target.value)}
              value={inviteUser}
            />
            <button>Invite user</button>
          </form>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProjectDetailControls;

// css
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
}));
