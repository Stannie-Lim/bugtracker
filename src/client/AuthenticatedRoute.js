import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AuthenticatedRoute = ({ component, path, exact }) => {
  const isLoggedIn = useSelector(({ user }) => !!user.id);
  if (!isLoggedIn) return <Redirect to="/login" />;

  return <Route exact={exact} path={path} component={component} />;
};

export default AuthenticatedRoute;
