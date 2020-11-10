import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// store
import { inviteUserToProject } from "../../../store/store";

// css
import "./ProjectDetailControls.css";

// materialui
import Button from "@material-ui/core/Button";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";

const ProjectDetailControls = ({ projectId }) => {
  const [inviteUser, setInviteUser] = useState("");
  const [addUserVisibility, setAddUserVisibility] = useState(false);

  const userId = useSelector(({ user }) => user.id);
  const dispatch = useDispatch();
  const sendUserInvite = (ev) => {
    ev.preventDefault();
    dispatch(inviteUserToProject(inviteUser, projectId, userId));
  };

  const classes = useStyles();
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

        <Button
          variant="contained"
          onClick={() => setAddUserVisibility(!addUserVisibility)}
          classes={{ root: classes.button }}
          className="add-ticket-button"
        >
          Invite another user
        </Button>
      </div>
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
