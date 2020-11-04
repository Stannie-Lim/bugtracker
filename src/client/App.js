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
import Nav from "./components/dashboard/Nav";
import Home from "./components/dashboard/Home";
import Projects from "./components/dashboard/Projects";
import AddTicket from "./components/dashboard/AddTicket";
import AddProject from "./components/dashboard/AddProject";
import YourTickets from "./components/dashboard/YourTickets";
import ProjectDetail from "./components/dashboard/ProjectDetail";
import TicketsByType from "./components/dashboard/TicketsByType";
import TicketsByStatus from "./components/dashboard/TicketsByStatus";
import TicketsByPriority from "./components/dashboard/TicketsByPriority";

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
        <AuthenticatedRoute
          exact={true}
          path="/projects"
          component={Projects}
        />
        <AuthenticatedRoute
          exact={true}
          path="/add/projects"
          component={AddProject}
        />
        <AuthenticatedRoute
          exact={true}
          path="/projects/:projectId/add-ticket"
          component={AddTicket}
        />
        <AuthenticatedRoute
          exact={true}
          path="/projects/:projectId"
          component={ProjectDetail}
        />
        <AuthenticatedRoute
          exact={true}
          path="/home/tickets-by-priority"
          component={TicketsByPriority}
        />
        <AuthenticatedRoute
          exact={true}
          path="/home/tickets-by-type"
          component={TicketsByType}
        />
        <AuthenticatedRoute
          exact={true}
          path="/home/tickets-by-status"
          component={TicketsByStatus}
        />
        <AuthenticatedRoute
          exact={true}
          path="/home/your-current-tickets"
          component={YourTickets}
        />
      </HashRouter>
    </DndProvider>
  );
};

export default App;
