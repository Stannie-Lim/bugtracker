import { GET_TICKETS, CREATE_TICKET } from "../constants";

const ticketsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TICKETS:
      state = action.tickets;
      break;
    case CREATE_TICKET:
      state = [...state, action.ticket];
      break;
  }
  return state;
};

export default ticketsReducer;
