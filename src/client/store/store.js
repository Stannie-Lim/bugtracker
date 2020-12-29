import { createStore, applyMiddleware, combineReducers } from "redux";
import thunks from "redux-thunk";
import { createLogger } from "redux-logger";

// user auth
import user from "./user/reducer";
import {
  login,
  signout,
  register,
  changeName,
  changeEmail,
  changePassword,
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

// error
import error from "./error/reducer";

const reducer = combineReducers({
  user,
  error,
  projects,
  tickets,
});

const store = createStore(reducer, applyMiddleware(thunks));

export default store;

export {
  login,
  signout,
  register,
  getTickets,
  changeName,
  changeEmail,
  getProjects,
  createTicket,
  assignTicket,
  createProject,
  changePassword,
  unassignTicket,
  resolveTicket,
  setTicketCardOrder,
  inviteUserToProject,
  declineProjectInvite,
  acceptProjectInvite,
};
