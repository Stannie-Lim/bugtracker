import { _getProjects, _createProject } from "./actions";
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

export const createProject = (title, description) => {
  return async (dispatch) => {
    try {
      const project = (
        await AxiosHttpRequest("POST", "/api/projects", { title, description })
      ).data;
      dispatch(_createProject(project));
    } catch (err) {
      console.log(err);
    }
  };
};
