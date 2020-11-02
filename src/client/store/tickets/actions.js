import { GET_TICKETS } from "../constants";

export const _getTickets = (tickets) => {
  return {
    type: GET_TICKETS,
    tickets,
  };
};
