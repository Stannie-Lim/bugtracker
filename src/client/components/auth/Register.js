import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// css
import "./register.css";

// store
import { register } from "../../store/store";

// materialui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const Register = () => {
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const registerNewAccount = (ev) => {
    ev.preventDefault();

    // const formData = makeFormData();
    // console.log(formData);

    dispatch(register(firstName, lastName, email, password));
  };

  const makeFormData = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("image", image);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("password", password);
    return formData;
  };

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
        <form onSubmit={registerNewAccount}>
          <div>
            <TextField
              required
              id="outlined-required"
              label="First Name"
              variant="outlined"
              onChange={({ target }) => setFirstName(target.value)}
              value={firstName}
              className="auth-text-field"
              margin="dense"
              inputProps={{ style: { fontSize: 20 } }}
              autoFocus={true}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Last Name"
              variant="outlined"
              onChange={({ target }) => setLastName(target.value)}
              value={lastName}
              className="auth-text-field"
              margin="dense"
              inputProps={{ style: { fontSize: 20 } }}
            />
          </div>
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
          <div className="authbuttons">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              classes={{ root: classes.button }}
            >
              Register
            </Button>
          </div>
          {/* <input
          type="file"
          name="image"
          onChange={({ target }) => setImage(target.files[0])}
          required
        /> */}
          {/* {image && <img src={window.URL.createObjectURL(image)} />} */}
          <h1>
            Already have an account? <Link to="login">Click here</Link> to sign
            in!
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Register;

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
