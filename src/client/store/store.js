import { createStore, applyMiddleware, combineReducers } from "redux";
import thunks from "redux-thunk";
import { createLogger } from "redux-logger";

// user auth
import user from "./user/reducer";
import {
  login,
  signout,
  register,
  setTicketCardOrder,
  inviteUserToProject,
  declineProjectInvite,
} from "./user/thunks";

// projects
import projects from "./projects/reducer";
import {
  getProjects,
  createProject,
  acceptProjectInvite,
} from "./projects/thunks";

// tickets
import tickets from "./tickets/reducer";
import {
  getTickets,
  createTicket,
  assignTicket,
  resolveTicket,
  unassignTicket,
} from "./tickets/thunks";

const reducer = combineReducers({
  user,
  projects,
  tickets,
});

const store = createStore(
  reducer,
  applyMiddleware(thunks, createLogger({ collapsed: true }))
);

export default store;

export {
  login,
  signout,
  register,
  getProjects,
  getTickets,
  createProject,
  createTicket,
  assignTicket,
  unassignTicket,
  resolveTicket,
  setTicketCardOrder,
  inviteUserToProject,
  declineProjectInvite,
  acceptProjectInvite,
};
