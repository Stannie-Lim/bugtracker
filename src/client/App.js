import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";

// common
import { getJWT } from "./utils/axios";

// authenticated route
import AuthenticatedRoute from "./AuthenticatedRoute";

// components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// authed components
import Home from "./components/dashboard/Home";

// store
import { login } from "./store/store";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const jwt = getJWT();
    dispatch(login("", "", jwt));
  });

  const isLoggedIn = useSelector(({ user }) => !!user.id);
  console.log(isLoggedIn);

  return (
    <HashRouter>
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <AuthenticatedRoute
        isLoggedIn={isLoggedIn}
        exact={true}
        path="/home"
        component={Home}
      />
    </HashRouter>
  );
};

export default App;
