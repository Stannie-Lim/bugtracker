import axios from "axios";
import { setJWT, getMe } from "../../utils/axios";
import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import OAuth from "./OAuth";

// css
import "./login.css";

// store
import { login } from "../../store/store";
import { _login } from "../../store/user/actions";

// materialui
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const dispatch = useDispatch();

  const signin = (ev) => {
    ev.preventDefault();
    dispatch(login(email, password));
  };

  const checkAuth = async () => {
    try {
      const token = (await axios.get("/api/auth/user")).data;
      if (token) {
        setJWT(token);
        const user = await getMe();
        dispatch(_login(user));
      }
    } catch (err) {
      // do nothing! it just means you're not logged in
    }
  };

  const error = useSelector(({ error }) => error);
  useEffect(() => {
    checkAuth();
    if (error.length) {
      setOpen(true);
    }
  }, [error.length]);

  const classes = useStyles();
  const isLoggedIn = useSelector(({ user }) => !!user.id);
  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

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
          <OAuth />
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
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
