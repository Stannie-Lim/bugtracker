import { GET_PROJECTS, CREATE_PROJECT } from "../constants";

export const _getProjects = (projects) => {
  return {
    type: GET_PROJECTS,
    projects,
  };
};

export const _createProject = (project) => {
  return {
    type: CREATE_PROJECT,
    project,
  };
};
