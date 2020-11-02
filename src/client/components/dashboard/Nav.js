import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// common
import { removeJWT } from "../../utils/axios";

// css
import "./nav.css";

// store
import { _login } from "../../store/user/actions";

const Nav = ({ history }) => {
  const url = history.location.pathname.slice(1);
  const user = useSelector(({ user }) => user);

  const selected = (path) => {
    return path === url ? "selected" : "";
  };

  const dispatch = useDispatch();
  const logout = () => {
    removeJWT();
    dispatch(_login({}));
  };

  return (
    <div>
      <nav className="top-nav">
        <div className="top-left-nav">
          <h1>Logged in as {user.fullName}</h1>
        </div>
        <div className="top-right-nav">
          <Link to="/test">test</Link>
          <Link to="/login" onClick={() => logout()}>
            Log out
          </Link>
        </div>
      </nav>
      <nav className="left-nav">
        <Link to="/home" className={selected("home")}>
          Dashboard Home
        </Link>
        <Link to="/projects" className={selected("projects")}>
          Projects
        </Link>
      </nav>
    </div>
  );
};

export default Nav;
