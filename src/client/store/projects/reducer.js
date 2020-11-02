import { GET_PROJECTS } from "../constants";

const ticketsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PROJECTS:
      state = action.tickets;
      break;
  }
  return state;
};

export default ticketsReducer;
