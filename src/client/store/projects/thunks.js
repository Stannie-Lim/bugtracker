import { _getProjects, _createProject, _inviteUserToProject } from "./actions";
import { AxiosHttpRequest } from "../../utils/axios";

export const getProjects = () => {
  return async (dispatch) => {
    try {
      const projects = (await AxiosHttpRequest("GET", "/api/projects")).data;
      console.log(projects);
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

export const inviteUserToProject = (userToInvite, projectId) => {
  return async (dispatch) => {
    try {
      const project = (
        await AxiosHttpRequest("PUT", `/api/projects/${projectId}`, {
          userToInvite,
        })
      ).data;
      dispatch(_inviteUserToProject(project));
    } catch (err) {
      console.log(err);
    }
  };
};
