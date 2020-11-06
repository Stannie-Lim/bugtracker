import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import TopNav from "./TopNav";

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
      <TopNav
        open={open}
        setOpen={setOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
    </div>
  );
};

export default Nav;
