import { _getProjects } from "./actions";
import { AxiosHttpRequest } from "../../utils/axios";

export const getProjects = () => {
  return async (dispatch) => {
    try {
      const projects = (await AxiosHttpRequest("GET", "/api/projects")).data;
      dispatch(_getProjects(projects));
    } catch (err) {
      console.log(err);
    }
  };
};
