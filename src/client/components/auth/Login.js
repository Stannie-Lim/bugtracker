import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// css
import "./login.css";

// store
import { login } from "../../store/store";

// materialui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const signin = (ev) => {
    ev.preventDefault();
    dispatch(login(email, password));
  };

  const isLoggedIn = useSelector(({ user }) => !!user.id);
  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  const classes = useStyles();
  return (
    <div className="main-page">
      <Typography variant="h4" gutterBottom>
        Welcome to Bug Tracker
      </Typography>
      <div className="auth-form">
        <form onSubmit={signin}>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Email"
              variant="outlined"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
              className="auth-text-field"
              margin="dense"
              inputProps={{ style: { fontSize: 20 } }}
              autoFocus={true}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              className="auth-text-field"
              margin="dense"
              inputProps={{ style: { fontSize: 20 } }}
            />
          </div>
          <div className="auth-buttons">
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/register")}
              classes={{ root: classes.button }}
            >
              Register
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              classes={{ root: classes.button }}
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

// css
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  button: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
}));
