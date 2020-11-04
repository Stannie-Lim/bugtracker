import { _getTickets, _createTicket } from "./actions";
import { AxiosHttpRequest } from "../../utils/axios";

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
