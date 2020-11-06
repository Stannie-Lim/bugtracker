import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import TopNav from "./TopNav";
import LeftNav from './LeftNav';

// css
import "./nav.css";

const Nav = ({ history }) => {
  const url = history.location.pathname.slice(1);
  const selected = (path) => {
    return path === url ? "selected" : "";
  };

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <TopNav open={ open } setOpen={setOpen} handleDrawerClose={handleDrawerClose}  handleDrawerOpen={handleDrawerOpen} />
      <LeftNav open={ open } setOpen={setOpen} handleDrawerClose={handleDrawerClose}  handleDrawerOpen={handleDrawerOpen} />
    </div>
  );
};

/*

<div><nav className="left-nav">
        <Link to="/home" className={selected("home")}>
          Dashboard Home
        </Link>
        <Link to="/projects" className={selected("projects")}>
          Projects
        </Link>
      </nav>
*/

export default Nav;
