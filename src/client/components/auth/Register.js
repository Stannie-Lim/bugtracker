import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// css
import "./register.css";

// store
import { register } from "../../store/store";

const Register = () => {
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");

  const dispatch = useDispatch();

  const registerNewAccount = (ev) => {
    ev.preventDefault();
    dispatch(register(firstName, lastName, email, password));
  };

  const isLoggedIn = useSelector(({ user }) => !!user.id);
  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="authform">
      <form onSubmit={registerNewAccount}>
        <input
          type="text"
          onChange={({ target }) => setFirstName(target.value)}
          value={firstName}
          placeholder="First Name"
        />
        <input
          type="text"
          onChange={({ target }) => setLastName(target.value)}
          value={lastName}
          placeholder="Last Name"
        />
        <input
          type="text"
          onChange={({ target }) => setEmail(target.value)}
          value={email}
          placeholder="Email"
        />
        <input
          type="text"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
          placeholder="Password"
        />
        <button>Register</button>
        <h1>
          Already have an account? <Link to="login">Click here</Link> to sign
          in!
        </h1>
      </form>
    </div>
  );
};

export default Register;
