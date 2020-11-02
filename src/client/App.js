import { DndProvider } from "react-dnd";
import React, { useState, useEffect } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
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
import Nav from "./components/dashboard/Nav";

// store
import { login } from "./store/store";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const jwt = getJWT();
    dispatch(login("", "", jwt));
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <HashRouter>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <AuthenticatedRoute path="/" component={Nav} />
        <AuthenticatedRoute exact={true} path="/home" component={Home} />
      </HashRouter>
    </DndProvider>
  );
};

export default App;
