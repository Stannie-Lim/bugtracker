import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// css
import "./register.css";

// store
import { register } from "../../store/store";

const Register = () => {
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
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
        {/* <input
          type="file"
          name="image"
          onChange={({ target }) => setImage(target.files[0])}
          required
        /> */}
        {image && <img src={window.URL.createObjectURL(image)} />}
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
