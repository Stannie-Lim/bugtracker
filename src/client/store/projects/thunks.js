import { _getProjects } from "./actions";
import { AxiosHttpRequest } from "../../utils/axios";

export const getProjects = () => {
  return async (dispatch) => {
    try {
      const tickets = (await AxiosHttpRequest("GET", "/api/projects")).data;
      dispatch(_getProjects(tickets));
    } catch (err) {
      console.log(err);
    }
  };
};
