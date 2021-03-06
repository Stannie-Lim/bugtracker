import { _getTickets, _createTicket, _editTicketUser } from "./actions";
import { AxiosHttpRequest, getMe } from "../../utils/axios";

// projects
import { _getProjects } from "../projects/actions";

// user
import { _login } from "../user/actions";

export const getTickets = () => {
  return async (dispatch) => {
    try {
      const tickets = (await AxiosHttpRequest("GET", "/api/tickets")).data;
      dispatch(_getTickets(tickets));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createTicket = (info, type, priority, projectId) => {
  return async (dispatch) => {
    try {
      const ticket = (
        await AxiosHttpRequest("POST", `/api/tickets/${projectId}`, {
          info,
          type,
          priority,
        })
      ).data;
      dispatch(_createTicket(ticket));
    } catch (err) {
      console.log(err);
    }
  };
};

export const assignTicket = (userId, ticketId) => {
  return async (dispatch) => {
    try {
      // TODO: i put it as { userId } because in the future, i want admins to be able to assign  tickets to other users
      const ticket = (
        await AxiosHttpRequest("PUT", `/api/tickets/${ticketId}/assign`, {
          userId,
        })
      ).data;
      const projects = (await AxiosHttpRequest("GET", "/api/projects")).data;
      dispatch(_getProjects(projects));
      dispatch(_editTicketUser(ticket));
    } catch (err) {
      console.log(err);
    }
  };
};

export const unassignTicket = (userId, ticketId) => {
  return async (dispatch) => {
    try {
      const ticket = (
        await AxiosHttpRequest("PUT", `/api/tickets/${ticketId}/unassign`, {
          userId,
        })
      ).data;
      const projects = (await AxiosHttpRequest("GET", "/api/projects")).data;
      dispatch(_getProjects(projects));
      dispatch(_editTicketUser(ticket));
    } catch (err) {
      console.log(err);
    }
  };
};

export const resolveTicket = (userId, ticketId) => {
  return async (dispatch) => {
    try {
      const ticket = (
        await AxiosHttpRequest("PUT", `/api/tickets/${ticketId}/resolve`, {
          userId,
        })
      ).data;
      const projects = (await AxiosHttpRequest("GET", "/api/projects")).data;
      const user = await getMe();
      dispatch(_getProjects(projects));
      dispatch(_editTicketUser(ticket));
      dispatch(_login(user));
    } catch (err) {
      console.log(err);
    }
  };
};
