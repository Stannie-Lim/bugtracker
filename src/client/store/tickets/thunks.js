import { _getTickets } from "./actions";
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
