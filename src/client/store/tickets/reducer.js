import { GET_TICKETS, CREATE_TICKET, EDIT_TICKET } from "../constants";

const ticketsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TICKETS:
      state = action.tickets;
      break;
    case CREATE_TICKET:
      state = [...state, action.ticket];
      break;
    case EDIT_TICKET:
      state = state.map((ticket) =>
        ticket.id === action.ticket.id ? action.ticket : ticket
      );
      break;
  }
  return state;
};

export default ticketsReducer;
