import { GET_TICKETS, CREATE_TICKET } from "../constants";

export const _getTickets = (tickets) => {
  return {
    type: GET_TICKETS,
    tickets,
  };
};

export const _createTicket = (ticket) => {
  return {
    type: CREATE_TICKET,
    ticket,
  };
};
