import { GET_TICKETS } from "../constants";

const ticketsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TICKETS:
      state = action.tickets;
      break;
  }
  return state;
};

export default ticketsReducer;
